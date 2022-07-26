from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String

from api.db.base_class import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True)  # noqa
    name = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"))
