from datetime import datetime

from pydantic import BaseModel

from api.models.operation import OperationType
from api.schemas.account import Account
from api.schemas.account import AccountInDB
from api.schemas.category import Category
from api.schemas.category import CategoryInDB
from api.schemas.user import UserInDB


class OperationBase(BaseModel):
    date: datetime
    type: OperationType
    account_id: int
    category_id: int | None = None
    amount: float = 0

    class Config:
        orm_mode = True


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
