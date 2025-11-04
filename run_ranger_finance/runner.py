from .router import RangerFinanceRouter
from utils.runner import ModernRunner
from utils.utils import get_session, sleep, get_data_lines, get_new_db_path_name, build_db_path, MaxLenException, Logger
from .database.engine import RangerFinanceDbManager
from .database.models import RangerFinanceBaseModel
from .config import *
import os
from patchright.async_api import async_playwright
from .task_ui import TaskUi
from utils.models import Proxy
from loguru import logger
import traceback
import asyncio
import random
from curl_cffi.requests.errors import RequestsError
from aiohttp.client_exceptions import ClientResponseError
import os
from utils.run_config import ROOT_DIR
from utils.run_config import current_run, ROOT_DIR
from utils.client import SolanaClient


class RangerFinanceRunner(ModernRunner):
    def __init__(self):
        self.Router = RangerFinanceRouter
        super().__init__()

    async def run_task(self, data, need_to_sleep=True):
        if need_to_sleep:
            await sleep(*SLEEP_BETWEEN_WALLETS)
        await self.task_runner_ui(data)

    async def task_runner_ui(self, data):
        async with RangerFinanceDbManager(build_db_path(self.db_name), RangerFinanceBaseModel) as db_manager:
            proxy = data['proxy']
            client = data['client']
            session = get_session('https://www.app.ranger.finance/', proxy.session_proxy)
            semaphore = self.global_data['semaphore']
            async with semaphore:
                await self.run_task_ui(session, client, db_manager)

    async def handle_db(self):
        if self.db_name == 'new':
            new_db = get_new_db_path_name()
            async with RangerFinanceDbManager(new_db, RangerFinanceBaseModel) as db_manager:
                await db_manager.create_tables()
                async with db_manager.session.begin():
                    try:
                        for curr in range(len(self.prepared_data['clients'])):
                                data = {key: value[curr] for key, value in self.prepared_data.items()}
                                solana_client = data['clients']
                                proxy = data['proxies'].proxy
                                await solana_client.init()
                                await db_manager.create_base_note(solana_client._seed, proxy, solana_client.address)
                    except Exception:
                        os.remove(new_db)
                        raise
            self.db_name = new_db
        async with RangerFinanceDbManager(build_db_path(self.db_name), RangerFinanceBaseModel) as db_manager:
            return await db_manager.get_run_data()

    async def run_task_ui(self, session, client, db_manager):
        proxy = session.proxies.get('http')
        credentials, ip_port = proxy.split('@')
        username, password = credentials[7:].split(':')
        extensions = ",".join(EXTENSIONS_PATH)
        async with async_playwright() as playwright:
            chromium = playwright.chromium
            context_args = [f"--load-extension={extensions}"]
            if HIDEN_RUN:
                context_args += ["--headless=new"]
            context = await chromium.launch_persistent_context('',
                                                               headless=False,
                                                               no_viewport=True,
                                                               args=context_args,
                                                               proxy={
                                                                   'server': f'http://{ip_port}',
                                                                   'username': username,
                                                                   'password': password
                                                               },
                                                               slow_mo=600)
            task = TaskUi(client=client,
                          session=session,
                          db_manager=db_manager,
                          context=context)
            await self.Router().route(task=task, action=self.action)()
            await context.close()

    def prepare_data(self):
        project_proxies = os.path.join(ROOT_DIR, current_run.PACKAGE, 'data', 'proxies.txt')
        project_sids = os.path.join(ROOT_DIR, current_run.PACKAGE, 'data', 'sids.txt')
        proxies = list(get_data_lines(project_proxies))
        sids = list(get_data_lines(project_sids))
        if len(sids) > len(proxies):
            logger.warning(f'Not enough proxies to run all accounts with proxy! '
                           f'Sids - {len(sids)}. Proxies - {len(proxies)}')
        elif not sids:
            logger.error('No data to run!')
            return

        prepared_proxies = []
        prepared_clients = []
        proxies = self.justify_data(sids, proxies)
        for sid, raw_proxy in zip(sids, proxies):
            proxy = Proxy(raw_proxy)
            client = SolanaClient(seed=sid)
            prepared_proxies.append(proxy)
            prepared_clients.append(client)

            if not raw_proxy:
                logger.warning(f"There isn't proxy for this account: {client.address}. Running it without proxy")
        prepared_data = {'proxies': prepared_proxies, 'clients': prepared_clients}
        return prepared_data

    async def run_task_with_retry(self, data):
        client = data['client']
        await client.init()
        proxy = data['proxy']
        proxy = proxy.session_proxy.get('http') if proxy.session_proxy else None
        logger = Logger(f'Solana {client.address}', additional={'seed': client._seed,
                                                                'proxy': proxy}).logger
        extra_proxies = self.global_data['extra_proxies']
        need_sleep = True
        while True:
            try:
                return await self.run_task(data, need_to_sleep=need_sleep)
            except MaxLenException:
                need_sleep = False
                continue
            except (RequestsError,ClientResponseError) as e:
                if not extra_proxies:
                    logger.error('There is no extra proxy available!')
                    break
                logger.error(f"Task failed with exception: {type(e)}: {e}. Trying to get extra proxy...")
                random_proxy_index = random.randint(0, len(extra_proxies) - 1)
                random_proxy = extra_proxies.pop(random_proxy_index)
                logger.info(f'GOT PROXY {random_proxy}! Reconnecting...')
                proxy = Proxy(proxy=random_proxy)
                data['proxy'] = proxy
            except Exception as e:
                logger.error(f"Task failed with exception: {type(e)}: {e}|[{traceback.format_exc()}]. Retrying...")
                await sleep(5, 30)

    def get_global_data(self):
        global_data = super().get_global_data()
        semaphore = asyncio.Semaphore(SIMULTANEOUS_TASKS)
        global_data.update({'semaphore': semaphore})
        return global_data