from pydantic import BaseModel
from pydantic import Field


class CurrencyBase(BaseModel):
    name: str
    code: str = Field(max_length=5)

    class Config:
        orm_mode = True
