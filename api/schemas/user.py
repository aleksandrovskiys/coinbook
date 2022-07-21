from pydantic import BaseModel
from pydantic import EmailStr


class UserBase(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr
    is_active: bool | None = True
    is_superuser: bool = False


class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserInDBBase(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserInDB(UserInDBBase):
    hashed_password: str


class User(UserBase):
    ...
