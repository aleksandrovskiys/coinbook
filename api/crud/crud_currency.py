from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.models.currency import Currency
from api.schemas.currency import CurrencyBase


class CurrencyCrud(CRUDBase[Currency, CurrencyBase, CurrencyBase]):
    def get(self, session: Session, code: str) -> Currency | None:
        return session.query(self.model).get(code)


currency = CurrencyCrud(Currency)
