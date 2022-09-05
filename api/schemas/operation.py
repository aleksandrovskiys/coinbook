from datetime import datetime

from pydantic import BaseModel
from pydantic import Field

from api.schemas.account import Account
from api.schemas.category import Category


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

    class Config:
        json_encoders = {
            datetime: lambda v: v.isoformat() + "Z",
        }


class OperationDelete(OperationBase):
    id: int
