import asyncio

import pyuseragents
from eth_account import Account
from eth_account.messages import encode_defunct, SignableMessage
from web3 import Web3
from web3.eth import AsyncEth
from .paths import (SEED_TO_ADDRESS_JS, SIGN_MESSAGE_BIP322_JS, SEED_TO_ADDRESS_SOLANA_JS, SIGN_MESSAGE_SOLANA_JS,
                    SEED_TO_ADDRESS_SUI_JS, SIGN_MESSAGE_SUI_JS)
import json
from loguru import logger
from solana.rpc.async_api import AsyncClient
from solders.pubkey import Pubkey
from solana.rpc.types import TokenAccountOpts
import aiohttp
from solana.exceptions import SolanaRpcException
from httpx import HTTPStatusError
from functools import wraps
from .utils import sleep


def retry():
    def deco(func):
        @wraps(func)
        async def inner(*args, **kwargs):
            attempts = 5
            while attempts:
                try:
                    return await func(*args, **kwargs)
                except (SolanaRpcException, HTTPStatusError):
                    attempts -= 1
                    await sleep(10, 30)
                    continue
                except:
                    raise
        return inner
    return deco


class Client:
    def __init__(self,  key: str, http_provider: str = 'https://rpc.ankr.com/bsc', proxy=None):
        self.w3 = None
        self.key = key
        self.address = self.get_address_from_private()
        self.headers = {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/json',
            'user-agent': pyuseragents.random()
        }
        self.proxy = proxy
        self.http_provider = http_provider
        self.chain_id = None
        Account.enable_unaudited_hdwallet_features()
        self.define_new_provider(self.http_provider)

    def define_new_provider(self, http_provider: str, chain_id=None):
        self.chain_id = chain_id
        self.w3 = Web3(Web3.AsyncHTTPProvider(http_provider,
                                              request_kwargs={'proxy': self.proxy,
                                                              'headers': self.headers,
                                                              'ssl': False}),
                       modules={'eth': (AsyncEth,)}, middlewares=[])
        self.http_provider = http_provider

    def reconnect_with_new_proxy(self, proxy: str):
        self.headers.update({'user-agent': pyuseragents.random()})
        self.proxy = proxy
        self.define_new_provider(self.http_provider)


    def sign(self, encoded_msg: SignableMessage):
        return self.w3.eth.account.sign_message(encoded_msg, self.key)

    def get_signed_code(self, msg) -> str:
        return self.sign(encode_defunct(text=msg)).signature.hex()

    def get_address_from_private(self):
        return Account.from_key(self.key).address

    def __repr__(self):
        return f'Client <{self.address}>'


class BTCClient:
    def __init__(self, seed):
        self.wif = None
        self.address = None
        self._seed = seed

    async def init(self):
        await self.__get_wif_pk()

    async def __get_wif_pk(self):
        args = (self._seed, )
        process = await asyncio.create_subprocess_exec(
            'node', SEED_TO_ADDRESS_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            result = json.loads(stdout.decode())
            self.wif = result['wif']
            self.address = result['address']
        else:
            print("Something went wrong with getting wif, address...")

    async def sign_message_bip322(self, message):
        args = (self.wif, self.address, message)
        process = await asyncio.create_subprocess_exec(
            'node', SIGN_MESSAGE_BIP322_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            return json.loads(stdout.decode())
        else:
            print("Something went wrong with signing bip322 message...")

class SolanaClient:
    def __init__(self, seed, address=None, logger=None):
        self.address = address if address else None
        self._seed = seed
        self.rpc_url = "https://api.mainnet-beta.solana.com"

    async def init(self):
        await self.__get_address()

    async def __get_address(self):
        args = (self._seed, )
        process = await asyncio.create_subprocess_exec(
            'node', SEED_TO_ADDRESS_SOLANA_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            result = json.loads(stdout.decode())
            self.address = result['address']
        else:
            print(f"Something went wrong with getting address... {stdout.decode()}")

    async def sign_message(self, message, encoding='58'):
        args = (self._seed, message, encoding)
        process = await asyncio.create_subprocess_exec(
            'node', SIGN_MESSAGE_SOLANA_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            return json.loads(stdout.decode())
        else:
            print(f"Something went wrong with signing message.. {stdout.decode()}")

    def reconnect_with_new_proxy(self, proxy):
        pass

    @retry()
    async def get_sol_balance(self):
        owner = Pubkey.from_string(self.address)
        async with AsyncClient(self.rpc_url) as client:
            resp = await client.get_balance(owner)
            if resp.value is None:
                return 0.0
            lamports = resp.value
            return lamports / 1_000_000_000

    def _get_attr(self, obj, key):
        if isinstance(obj, dict):
            return obj.get(key)
        return getattr(obj, key)

    def _get_parsed_from_account_data(self, data):
        parsed = None
        if hasattr(data, "parsed"):
            parsed = data.parsed
            if hasattr(parsed, "to_json"):
                parsed = parsed.to_json()
        elif isinstance(data, dict):
            parsed = data.get("parsed")
        elif hasattr(data, "to_json"):
            dj = data.to_json()
            parsed = dj.get("parsed") if isinstance(dj, dict) else None
        return parsed

    @retry()
    async def _fetch_json_parsed_accounts(self, client: AsyncClient, owner: Pubkey, program_id: Pubkey):
        opts = TokenAccountOpts(program_id=program_id, encoding="jsonParsed")
        if hasattr(client, "get_token_accounts_by_owner_json_parsed"):
            return await client.get_token_accounts_by_owner_json_parsed(owner, opts, commitment="confirmed")
        return await client.get_token_accounts_by_owner(owner, opts, commitment="confirmed")

    @retry()
    async def get_all_tokens(self):
        owner = Pubkey.from_string(self.address)
        TOKEN_PROGRAM_ID = Pubkey.from_string("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
        TOKEN_2022_PROGRAM = Pubkey.from_string("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb")
        async with AsyncClient(self.rpc_url) as client:
            resp_main = await self._fetch_json_parsed_accounts(client, owner, TOKEN_PROGRAM_ID)
            resp_token2 = await self._fetch_json_parsed_accounts(client, owner, TOKEN_2022_PROGRAM)

            value_main = getattr(resp_main, "value", None) or []
            value_token2 = getattr(resp_token2, "value", None) or []
            value = list(value_main) + list(value_token2)

            by_mint = {}

            for acc in value:
                try:
                    pubkey = self._get_attr(acc, "pubkey")
                    if hasattr(pubkey, "to_string"):
                        pubkey = pubkey.to_string()

                    account = self._get_attr(acc, "account")
                    if account is None:
                        continue

                    data = self._get_attr(account, "data")
                    parsed = self._get_parsed_from_account_data(data)
                    if not parsed or (isinstance(parsed, dict) and parsed.get("type") != "account"):
                        continue
                    info = parsed["info"]
                    token_amount = info["tokenAmount"]
                    mint = info["mint"]

                    decimals = int(token_amount.get("decimals", 0))
                    raw_amount = int(token_amount.get("amount", "0"))
                    ui_amount = token_amount.get("uiAmount")
                    if ui_amount is None:
                        ui_amount = raw_amount / (10 ** decimals if decimals else 1)

                    entry = by_mint.setdefault(
                        mint,
                        {"mint": mint, "amount": 0, "decimals": decimals, "uiAmount": 0.0, "accounts": []},
                    )
                    entry["amount"] += raw_amount
                    entry["uiAmount"] += float(ui_amount or 0.0)
                    entry["accounts"].append(
                        {"accountPubkey": pubkey, "rawAmount": raw_amount, "uiAmount": float(ui_amount or 0.0)}
                    )
                except Exception:
                    continue
            tokens = [v for v in by_mint.values() if (v.get("amount", 0) or 0) > 0]
            tokens.sort(key=lambda x: x.get("uiAmount", 0.0), reverse=True)
            return tokens

class SuiClient:
    def __init__(self, seed, address=None):
        self.address = address if address else None
        self._seed = seed

    async def init(self):
        await self.__get_address()

    async def __get_address(self):
        args = (self._seed, )

        process = await asyncio.create_subprocess_exec(
            'node', SEED_TO_ADDRESS_SUI_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            result = json.loads(stdout.decode())
            self.address = result['address']
        else:
            print(f"Something went wrong with getting address... {stderr.decode()}")

    async def sign_message(self, message):
        args = (self._seed, message)
        process = await asyncio.create_subprocess_exec(
            'node', SIGN_MESSAGE_SUI_JS, *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        if process.returncode == 0:
            return json.loads(stdout.decode())
        else:
            print(f"Something went wrong with signing message.. {stderr.decode()}")

    def reconnect_with_new_proxy(self, proxy):
        pass
