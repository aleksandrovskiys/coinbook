from pydantic import BaseModel


class CategoryBase(BaseModel):
    name: str


class CategoryInDB(CategoryBase):
    user_id: int
    id: int  # noqa

    class Config:
        orm_mode = True
