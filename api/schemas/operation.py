from datetime import datetime

from pydantic import BaseModel
from pydantic import Field

from api.schemas.account import Account
from api.schemas.account import AccountInDB
from api.schemas.category import Category
from api.schemas.category import CategoryInDB
from api.schemas.user import UserInDB


class OperationBase(BaseModel):
    date: datetime
    account_id: int = Field(alias="accountId")
    category_id: int | None = Field(alias="categoryId", default=None)
    amount: float = 0

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class OperationCreate(OperationBase):
    user_id: int


class Operation(OperationBase):
    id: int
    account: Account
    category: Category | None


class OperationInDb(OperationBase):
    id: int
    user: UserInDB
    account: AccountInDB
    category: CategoryInDB
