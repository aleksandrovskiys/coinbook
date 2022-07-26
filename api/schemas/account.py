from pydantic import BaseModel


class AccountBase(BaseModel):
    name: str


class AccountCreate(AccountBase):
    user_id: int


class AccountInDB(AccountBase):
    user_id: int
    id: int  # noqa

    class Config:
        orm_mode = True
