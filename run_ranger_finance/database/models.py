from sqlalchemy import String, Boolean, DateTime
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, JSON, func, Float
from sqlalchemy.ext.hybrid import hybrid_property


class Base(DeclarativeBase):
    pass


class BaseModel(Base):
    __abstract__ = True
    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    address: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    seed: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    proxy: Mapped[str] = mapped_column(String(255), nullable=True)


class RangerFinanceBaseModel(BaseModel):
    __tablename__ = "ranger_finance_base"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    volume: Mapped[float] = mapped_column(Float, default=0)
