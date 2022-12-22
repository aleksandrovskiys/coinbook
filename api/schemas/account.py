from decimal import Decimal

from pydantic import BaseModel
from pydantic import Field

from api.schemas.currency import CurrencyBase


class AccountBase(BaseModel):
    name: str
    currency_code: str = Field(alias="currencyCode")

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class AccountCreate(AccountBase):
    user_id: int = Field(alias="userId")


class AccountUpdate(AccountCreate):
    id: int
    balance: Decimal


class AccountInDB(AccountBase):
    user_id: int
    id: int


class Account(AccountBase):
    id: int
    user_id: int = Field(alias="userId")

    balance: Decimal = Decimal(0)
    month_worth_change: Decimal = Field(default=Decimal(0), alias="monthWorthChange")
    currency: CurrencyBase
