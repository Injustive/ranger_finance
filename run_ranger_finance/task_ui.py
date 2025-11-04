from utils.utils import (Logger, sleep, retry, check_res_status,
                         asset_balance, read_json, Contract,
                         get_decimals, get_data_lines, with_retry_async,
                         transfer, get_gas_params, MaxLenException)
from .config import *
import random


class TaskUi(Logger):
    def __init__(self, client, session, db_manager, context):
        self.client = client
        self.session = session
        self.db_manager = db_manager
        self.context = context
        super().__init__(f'Solana {self.client.address}', additional={'seed': self.client._seed,
                                                                      'proxy': self.session.proxies.get('http')})

    async def connect_phantom_wallet(self):
        page = await self.context.new_page()
        await page.goto('chrome-extension://bfnaelmomeimhlpmgjnjophhpkkoljpa/onboarding.html')
        await page.click('button:has-text("I already have a wallet")')
        await page.click('button:has-text("Import recovery phrase")')
        for index, word  in enumerate(self.client._seed.split()):
            locator = page.get_by_test_id(test_id=f'secret-recovery-phrase-word-input-{index}')
            await locator.fill(word)
        await sleep(1)
        await page.click('button:has-text("Import Wallet")')
        continue_button = page.locator('button:has-text("Continue")')
        await continue_button.wait_for(state="visible", timeout=10000)
        await continue_button.click()
        pwd = page.get_by_test_id(test_id=f'onboarding-form-password-input')
        confirm_pwd = page.get_by_test_id(test_id=f'onboarding-form-confirm-password-input')
        await pwd.fill(DEFAULT_PASSWORD)
        await confirm_pwd.fill(DEFAULT_PASSWORD)
        confirm_checkbox = page.get_by_test_id(test_id=f'onboarding-form-terms-of-service-checkbox')
        await confirm_checkbox.click()
        continue_button = page.locator('button:has-text("Continue")')
        await continue_button.wait_for(state="visible", timeout=10000)
        await continue_button.click()
        try:
            continue_button = page.locator('button:has-text("Continue")')
            await continue_button.wait_for(state="visible", timeout=5000)
            await continue_button.click()
        except:
            pass
        await page.close()

    async def ranger_finance_login(self, page):
        await page.goto("https://www.app.ranger.finance/spot")
        await sleep(3, 5)
        connect_wallet_btn = page.locator('button:has-text("Continue with a wallet")').first
        await connect_wallet_btn.wait_for(state="visible", timeout=20000)
        await connect_wallet_btn.click()
        async with self.context.expect_event("page", timeout=10000) as popup_info:
            await page.click('button:has-text("Phantom")')
            await sleep(3)
            phantom_page = await popup_info.value
        await phantom_page.click('button:has-text("Connect")')
        await sleep(3)
        async with self.context.expect_event("page", timeout=10000) as popup_info:
            await page.click('button:has-text("Continue without Ledger")')
            await sleep(3)
            phantom_page = await popup_info.value
        await phantom_page.click('button:has-text("Confirm")')
        await sleep(3, 5)
        await page.click('button:has-text("Accept")')
        await sleep(3, 5)
        self.logger.success("Logged in successfully!")

    async def main_swap(self, page, swap_from, one_side=False, back_swap_deviation=BACK_SWAP_DEVIATION):
        for attempt in range(10):
            balance = await self.solana_balance
            if swap_from == "SOL":
                if SWAP_USE_METHOD == 'amount':
                    random_swap_amount = round(random.uniform(*SWAP_AMOUNT), 6)
                    if random_swap_amount > float(balance):
                        self.logger.error(f"Can't swap! Your amount is {random_swap_amount} SOL. "
                                          f"But you have {balance} SOL.")
                        return False
                else:
                    random_swap_amount = round(float(balance) * (random.randint(*SWAP_PERCENTAGE) / 100), 5)
            else:
                for token in await self.client.get_all_tokens():
                    if token['mint'] == TOKENS_FOR_SWAP[swap_from]:
                        deviation = token['uiAmount'] * (back_swap_deviation / 100)
                        random_swap_amount = round(token['uiAmount'] - deviation, 3)
                        break

            if swap_from == 'SOL':
                if balance < random_swap_amount:
                    self.logger.error(f"You don't have enough SOL. You have {balance} SOL. Need {random_swap_amount} SOL.")
                    return False
            else:
                for token in await self.client.get_all_tokens():
                    if token['mint'] == TOKENS_FOR_SWAP[swap_from]:
                        if token['uiAmount'] < random_swap_amount:
                            self.logger.error(f"You don't have enough {swap_from}. You have {token['uiAmount']} {swap_from}. Need {random_swap_amount} {swap_from}.")
                            return False

            random_ticket_to_swap = random.choice([ticket for ticket in TOKENS_FOR_SWAP if ticket != swap_from])
            self.logger.info(f"Swapping {random_swap_amount} {swap_from} to {random_ticket_to_swap}...")
            is_successful = await self.swap(page, swap_from=swap_from, swap_to=random_ticket_to_swap, amount=random_swap_amount)
            if one_side:
                return is_successful
            await sleep(10, 30)
            if is_successful:
                for token in await self.client.get_all_tokens():
                    if token['mint'] == TOKENS_FOR_SWAP[random_ticket_to_swap]:
                        deviation = token['uiAmount'] * (back_swap_deviation / 100)
                        amount = round(token['uiAmount'] - deviation, 3)
                        break
                else:
                    self.logger.error("Can't get destination amount")
                    continue
                if FULL_RANDOM_SWAPS:
                    ticket_to_swap = random.choice([ticket for ticket in TOKENS_FOR_SWAP if ticket != random_ticket_to_swap])
                else:
                    ticket_to_swap = swap_from
                self.logger.info(f"Swapping {amount} {random_ticket_to_swap} to {swap_from}...")
                await self.swap(page, swap_from=random_ticket_to_swap, swap_to=ticket_to_swap, amount=amount)
                return ticket_to_swap
            return False
        else:
            self.logger.error("Swap failed after 5 attempts.")
            return False

    async def swap(self, page, swap_from, swap_to, amount):
        for attempt in range(10):
            try:
                await page.goto('https://www.app.ranger.finance/spot')
                await page.click('button#spot-market-sell-token--button')
                await page.fill('input#spot-market-sell-token--input', TOKENS_FOR_SWAP[swap_from])
                input_token = page.locator('ul#spot-market-sell-token--listbox li')
                await input_token.wait_for(state="visible", timeout=20000)
                input_token = input_token.first
                await input_token.locator("div").nth(1).click()
                await sleep(1, 3)
                await page.click('button#spot-market-buy-token--button')
                await page.fill('input#spot-market-buy-token--input', TOKENS_FOR_SWAP[swap_to])
                output_token = page.locator('ul#spot-market-buy-token--listbox li')
                await output_token.wait_for(state="visible", timeout=20000)
                output_token = output_token.first
                await output_token.locator("div").nth(1).click()
                await sleep(3, 5)
                sell_input = page.locator('input[aria-labelledby="spot-sell-size"]')
                await sell_input.click()
                await sell_input.fill(str(amount))
                async with self.context.expect_event("page", timeout=10000) as popup_info:
                    initiate_button = page.locator('button:has-text("Initiate")')
                    await initiate_button.wait_for(state="visible", timeout=20000)
                    await initiate_button.click()
                    await sleep(3)
                    phantom_page = await popup_info.value
                await sleep(3, 5)
                await phantom_page.click('button:has-text("Confirm")')
                self.logger.success("Swapped successfully!")
                return True
            except Exception as e:
                self.logger.error(f"Swap failed: {e}. Attempt {attempt}")
                continue
        else:
            self.logger.error(f"Swap failed after 10 attempts")
            return False

    async def swap_n_times(self):
        await self.connect_phantom_wallet()
        page = await self.context.new_page()
        await self.ranger_finance_login(page)
        swap_times = random.randint(*SWAP_TIMES)
        self.logger.info(f"Starting swapping {swap_times} times..")
        swap_from = SWAP_FROM
        for _ in range(swap_times):
            swap_from = await self.main_swap(page, swap_from=swap_from)
            if not swap_from:
                break
            await sleep(*DELAY_BETWEEN_SWAPS)
        if SWAP_ALL_TO_SOL_AFTER_WORK:
            await self.swap_all_to_sol(page)

    async def swap_until_volume(self):
        await self.connect_phantom_wallet()
        page = await self.context.new_page()
        await self.titan_login(page)
        volume_to_swap = random.randint(*MAX_SWAP_VOLUME)
        self.logger.info(f"Starting swapping until {volume_to_swap}$ volume..")
        swap_from = SWAP_FROM
        while True:
            try:
                volume = (await self.get_stats()).json()['total_volume_usd']
            except MaxLenException:
                self.logger.info("Rate limit exceeded. Retrying...")
                await sleep(10, 30)
                continue
            await self.db_manager.insert_column(self.client._seed, 'volume', volume)
            if volume > volume_to_swap:
                self.logger.success(f"Already achieved {volume} volume!")
                break
            swap_from = await self.main_swap(page, swap_from=swap_from)
            if not swap_from:
                break
            await sleep(*DELAY_BETWEEN_SWAPS)
        if SWAP_ALL_TO_SOL_AFTER_WORK:
            await self.swap_all_to_sol(page)

    @retry()
    @check_res_status()
    async def get_stats(self):
        url = 'https://titan.exchange/api/wallet-stats/stats'
        headers = {
            'accept': '*/*',
            'accept-language': 'uk-UA,uk;q=0.9,ru;q=0.8,en-US;q=0.7,en;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'origin': 'https://titan.exchange',
            'pragma': 'no-cache',
            'priority': 'u=1, i',
            'referer': 'https://titan.exchange/leaderboard',
            'sec-ch-ua': '"Google Chrome";v="141", "Not?A_Brand";v="8", "Chromium";v="141"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': self.session.headers['User-Agent']
        }
        json_data = {
            'wallet_address': self.client.address
        }
        return await self.session.post(url, headers=headers, json=json_data)

    @property
    async def solana_balance(self):
        return await self.client.get_sol_balance()

    async def swap_all_to_sol(self, page):
        self.logger.info("Swapping ALL to SOL...")
        for token in await self.client.get_all_tokens():
            for ticket, contract in TOKENS_FOR_SWAP.items():
                if token['mint'] == contract:
                    if token['uiAmount'] > 0.01:
                        self.logger.info(f"Swapping {token['uiAmount']} {ticket} to SOL...")
                        await self.swap(page, swap_from=ticket, swap_to="SOL", amount=token['uiAmount'])