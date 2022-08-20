from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy.orm import relationship

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

    categories = relationship("Category", cascade="all, delete-orphan", order_by="Category.id", backref="user")
    accounts = relationship("Account", cascade="all, delete-orphan", order_by="Account.id", backref="user")
    operations = relationship(
        "Operation", cascade="all, delete-orphan", order_by="desc(Operation.date)", backref="user"
    )

    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}"
