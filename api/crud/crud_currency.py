from sqlalchemy import select
from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.db.session import SessionLocal
from api.models.currency import Currency
from api.schemas.currency import CurrencyBase


class CurrencyCrud(CRUDBase[Currency, CurrencyBase, CurrencyBase]):
    def get(self, session: Session, code: str) -> Currency | None:
        return session.query(self.model).get(code)

    def get_currency_codes(self, session: Session | None = None) -> list[str]:
        if not session:
            session = SessionLocal()

        return session.scalars(select(Currency.code)).all()


currency = CurrencyCrud(Currency)
