from pydantic import BaseModel

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


class Category(CategoryBase):
    id: int

    class Config:
        orm_mode = True
