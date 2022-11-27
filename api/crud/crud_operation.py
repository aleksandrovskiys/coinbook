import datetime
from decimal import Decimal

from sqlalchemy import and_
from sqlalchemy import case
from sqlalchemy import column
from sqlalchemy import func
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import coalesce
from sqlalchemy.sql.functions import sum

from api import crud
from api.crud.base import CRUDBase
from api.models.account import Account
from api.models.category import Category
from api.models.category import CategoryType
from api.models.operation import Operation
from api.schemas.operation import OperationBase
from api.schemas.operation import OperationCreate
from api.schemas.reports import PeriodTypes
from api.schemas.reports import SpendInPeriodSchema


class OperationCRUD(CRUDBase[Operation, OperationCreate, OperationBase]):
    def add_balance_correction_operation(
        self, session: Session, account: Account, current_balance: Decimal, new_balance: Decimal
    ):
        balance_correction_category = crud.category.get_balance_correction_category(session=session)
        operation_data = OperationCreate(
            date=datetime.datetime.utcnow(),
            accountId=account.id,
            categoryId=balance_correction_category.id,
            amount=round(new_balance - current_balance, 2),
            user_id=account.user_id,
        )
        self.create(session=session, obj_in=operation_data)

    def get_balance_change_by_period(
        self,
        session: Session,
        user_id: int,
        start_date: datetime.date,
        end_date: datetime.date,
        period_type: PeriodTypes = PeriodTypes.day,
    ) -> list[SpendInPeriodSchema]:

        dates_list = func.generate_series(start_date, end_date, "1 " + period_type.value).alias("timeframe")
        timeframe_column_name = "timeframe"
        timeframe = column(timeframe_column_name)

        select_stmt = (
            select(
                func.date_trunc(period_type.value, timeframe).label(timeframe_column_name),
                coalesce(
                    sum(case((Category.type == CategoryType.expense, -Operation.amount), else_=Operation.amount)),
                    0,
                ).label("timeframe_total"),
            )
            .select_from(dates_list)
            .outerjoin(
                Operation,
                and_(
                    func.date_trunc(period_type.value, Operation.date) == func.date_trunc(period_type.value, timeframe),
                    Operation.user_id == user_id,
                ),
            )
            .outerjoin(Category, Operation.category_id == Category.id)
            .group_by(timeframe)
            .order_by(func.date_trunc(period_type.value, timeframe))
        )

        results = session.execute(select_stmt).all()
        return [
            SpendInPeriodSchema(period=result[timeframe_column_name], amount=result["timeframe_total"])
            for result in results
        ]

    def get_balance_to_date(self, session: Session, user_id: int, date_: datetime.date) -> Decimal:
        """Returns balance to the beginning of the selected day"""
        result = (
            session.query(sum(Operation.amount).label("balance"))
            .filter(Operation.date < date_)
            .filter(Operation.user_id == user_id)
            .first()
        )

        return result["balance"] or Decimal(0)


operation = OperationCRUD(Operation)
