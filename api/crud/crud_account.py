import datetime

from sqlalchemy import case
from sqlalchemy import func
from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.models.account import Account
from api.models.operation import Operation
from api.models.operation import OperationType
from api.models.user import User
from api.schemas.account import Account as AccountSchema
from api.schemas.account import AccountBase
from api.schemas.account import AccountCreate


class AccountCrud(CRUDBase[Account, AccountCreate, AccountBase]):
    def get_user_accounts(self, session: Session, user: User) -> list[Account]:
        accounts_objects = session.query(self.model).filter(self.model.user_id == user.id).all()
        accounts = []
        for account in accounts_objects:
            account = AccountSchema.from_orm(account)
            account.balance = self.get_account_balance(
                session=session,
                account=account,
            )
            account.month_worth_change = self.get_account_month_worth_change(session=session, account=account)
            accounts.append(account)
        return accounts

    @staticmethod
    def get_account_balance(session: Session, account: Account) -> int:
        result = (
            session.query(
                func.sum(
                    case((Operation.type == OperationType.expense, -Operation.amount), else_=Operation.amount)
                ).label("balance")
            )
            .where(Operation.account_id == account.id)
            .first()
        )

        return round(result["balance"], 2)

    @staticmethod
    def get_account_month_worth_change(session: Session, account: Account):
        result = (
            session.query(
                func.sum(
                    case((Operation.type == OperationType.expense, -Operation.amount), else_=Operation.amount)
                ).label("month_worth_change")
            )
            .where(Operation.account_id == account.id)
            .where(Operation.date >= datetime.date.today().replace(day=1))
            .first()
        )

        return round(result["month_worth_change"], 2)


account = AccountCrud(Account)
