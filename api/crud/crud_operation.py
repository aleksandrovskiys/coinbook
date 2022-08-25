import datetime

from sqlalchemy.orm import Session

from api import crud
from api.crud.base import CRUDBase
from api.models.account import Account
from api.models.operation import Operation
from api.schemas.operation import OperationCreate


class OperationCRUD(CRUDBase[Operation, OperationCreate, OperationCreate]):
    def add_balance_correction_operation(
        self, session: Session, account: Account, current_balance: float, new_balance: float
    ):
        balance_correction_category = crud.category.get_balance_correction_category(session=session)
        operation_data = OperationCreate(
            date=datetime.datetime.now(),
            accountId=account.id,
            categoryId=balance_correction_category.id,
            amount=round(new_balance - current_balance, 2),
            user_id=account.user_id,
        )
        self.create(session=session, obj_in=operation_data)


operation = OperationCRUD(Operation)
