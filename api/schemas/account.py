from pydantic import BaseModel

from api.schemas.currency import CurrencyBase


class AccountBase(BaseModel):
    name: str
    currency: CurrencyBase


class AccountCreate(AccountBase):
    user_id: int


class AccountInDB(AccountBase):
    user_id: int
    id: int
    currency_code: str

    class Config:
        orm_mode = True


class Account(AccountBase):
    id: int

    class Config:
        orm_mode = True
