from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import constr


class UserBase(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr
    is_active: bool | None = True
    is_superuser: bool = False


class UserCreate(UserBase):
    email: EmailStr
    password: str
    first_name: constr(min_length=1, strip_whitespace=True)
    last_name: constr(min_length=1, strip_whitespace=True)


class UserInDBBase(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserInDB(UserInDBBase):
    hashed_password: str


class User(UserBase):
    ...
