from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship

from api.constants import DEFAULT_CURRENCY_CODE
from api.db.base_class import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean(), default=True)
    first_name = Column("first_name", String)
    last_name = Column("last_name", String)
    is_superuser = Column(Boolean(), default=False)
    default_currency_code = Column(
        ForeignKey("currencies.code", name="user_default_currency_code_fkey"),
        nullable=False,
        server_default=DEFAULT_CURRENCY_CODE,
    )

    categories = relationship("Category", cascade="all, delete-orphan", order_by="Category.id", backref="user")
    accounts = relationship("Account", cascade="all, delete-orphan", order_by="Account.id", backref="user")
    operations = relationship(
        "Operation", cascade="all, delete-orphan", order_by="desc(Operation.date)", backref="user"
    )
    default_currency = relationship("Currency")

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
