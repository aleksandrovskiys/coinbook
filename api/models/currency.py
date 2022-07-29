from sqlalchemy import Column
from sqlalchemy import String

from api.db.base_class import Base


class Currency(Base):
    __tablename__ = "currencies"

    name = Column(String)
    code = Column(String(5), primary_key=True, index=True)
