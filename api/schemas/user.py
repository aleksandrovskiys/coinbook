from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field
from pydantic import validator

from api import crud
from api.constants import DEFAULT_CURRENCY_CODE
from api.schemas.category import CategoryInDB


class UserBase(BaseModel):
    first_name: str | None
    last_name: str | None
    email: EmailStr
    is_active: bool | None = True
    is_superuser: bool = False
    default_currency_code: str = DEFAULT_CURRENCY_CODE

    @validator("default_currency_code")
    def validate_default_currency_code(cls, value: str) -> str:
        if value not in crud.currency.get_currency_codes():
            raise ValueError(f"Unknown currency code {value}")
        return value


class UserCreate(UserBase):
    email: EmailStr
    password: str
    first_name: str = Field(min_length=1, strip_whitespace=True)
    last_name: str = Field(min_length=1, strip_whitespace=True)


class UserInDBBase(UserBase):
    id: int
    categories: list[CategoryInDB]

    class Config:
        orm_mode = True


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


class UserLoginResponseSchema(BaseModel):
    access_token: str
    token_type: str
    user: User
