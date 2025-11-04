from database.engine import DbManager
from sqlalchemy import select
from utils.client import SolanaClient
from utils.models import Proxy


class RangerFinanceDbManager(DbManager):
    def __init__(self, db_path, base):
        super().__init__(db_path, base)

    async def create_base_note(self, seed, proxy, address):
        result = await self.session.execute(
            select(self.base).where(self.base.seed == seed)
        )
        existing_note = result.scalar_one_or_none()
        if existing_note:
            return existing_note
        note = self.base(address=address, seed=seed, proxy=proxy)
        self.session.add(note)

    async def get_run_data(self):
        async with self.session.begin():
            result = await self.session.execute(select(self.base))
            users = result.scalars().all()
            return [{'client': SolanaClient(seed=user.seed),
                     'proxy': Proxy(user.proxy)}
                    for user in users]

    async def insert_column(self, seed, name, value):
        async with self.session.begin():
            result = await self.session.execute(
                select(self.base).where(self.base.seed == seed)
            )
            obj = result.scalar_one_or_none()
            setattr(obj, name, value)

    async def get_column(self, seed, column_name):
        async with self.session.begin():
            result = await self.session.execute(
                select(self.base).where(self.base.seed == seed)
            )
            obj = result.scalar_one_or_none()
            return getattr(obj, column_name)