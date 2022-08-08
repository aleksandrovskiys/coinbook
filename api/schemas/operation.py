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
    amount: float = 0

    class Config:
        orm_mode = True


class OperationCreate(OperationBase):
    account_id: int
    category_id: int
    user_id: int | None = None


class Operation(OperationBase):
    id: int
    account: Account
    category: Category


class OperationInDb(OperationBase):
    id: int
    user: UserInDB
    account: AccountInDB
    category: CategoryInDB
