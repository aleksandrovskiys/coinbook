import enum

from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import Enum
from sqlalchemy import Float
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy.orm import relationship

from api.db.base_class import Base


class OperationType(enum.Enum):
    expense = "expense"
    income = "income"
    balance_correction = "balance_correction"


class Operation(Base):
    __tablename__ = "operations"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DateTime)

    account_id = Column(Integer, ForeignKey("accounts.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    account = relationship("Account")
    category = relationship("Category")

    type = Column(Enum(OperationType))
    amount = Column(Float)
