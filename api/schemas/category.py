from decimal import Decimal

from pydantic import BaseModel
from pydantic import Field

from api.models.category import CategoryType


class CategoryBase(BaseModel):
    name: str
    type: CategoryType


class CategoryCreate(BaseModel):
    name: str
    user_id: int
    type: CategoryType


class CategoryInDB(CategoryBase):
    user_id: int
    id: int

    class Config:
        orm_mode = True


class CategoryWithExpenses(CategoryBase):
    id: int
    expenses: Decimal = Field(default=0)
    percentage_in_period: Decimal = Field(default=Decimal(0))

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class Category(CategoryBase):
    id: int
    month_expenses: Decimal = Field(alias="monthExpenses", default=0)

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
