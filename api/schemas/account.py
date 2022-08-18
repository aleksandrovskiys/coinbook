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


class AccountInDB(AccountBase):
    user_id: int
    id: int


class Account(AccountBase):
    id: int
    user_id: int = Field(alias="userId")

    balance: int = 0
    month_worth_change: int = Field(default=0, alias="monthWorthChange")
    currency: CurrencyBase
