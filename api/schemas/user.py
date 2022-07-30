from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field

from api.schemas.category import CategoryInDB


class UserBase(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr
    is_active: bool | None = True
    is_superuser: bool = False


class UserCreate(UserBase):
    email: EmailStr
    password: str
    first_name: str = Field(min_length=1, strip_whitespace=True)
    last_name: str = Field(min_length=1, strip_whitespace=True)


class UserInDBBase(UserBase):
    id: int  # noqa
    categories: list[CategoryInDB]

    class Config:
        orm_mode = True


class UserInDB(UserInDBBase):
    hashed_password: str


class User(UserBase):
    class Config:
        orm_mode = True


class UserLoginResponseSchema(BaseModel):
    access_token: str
    token_type: str
    user: User
