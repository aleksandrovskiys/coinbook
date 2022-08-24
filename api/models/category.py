import enum

from sqlalchemy import Column
from sqlalchemy import Enum
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from api.db.base_class import Base


class CategoryType(enum.Enum):
    expense = "expense"
    income = "income"
    balance_correction = "balance_correction"


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
    type = Column(Enum(CategoryType), default=CategoryType.expense)
