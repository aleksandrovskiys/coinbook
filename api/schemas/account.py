from pydantic import BaseModel


class AccountBase(BaseModel):
    name: str


class AccountCreate(AccountBase):
    user_id: int


class AccountInDB(AccountBase):
    user_id: int
    id: int

    class Config:
        orm_mode = True


class Account(AccountBase):
    id: int

    class Config:
        orm_mode = True
