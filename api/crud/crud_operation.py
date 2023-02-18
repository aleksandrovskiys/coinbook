import datetime
from decimal import Decimal
from functools import reduce
from itertools import groupby

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
from api.schemas.category import CategoryWithExpenses
from api.schemas.operation import OperationBase
from api.schemas.operation import OperationCreate
from api.schemas.reports import PeriodCategoryExpenses
from api.schemas.reports import PeriodTypes
from api.schemas.reports import SpendInPeriodSchema
from api.utils.date_utils import get_end_of_period_date


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
                    self._get_operation_amount_sum(),
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
            session.query(self._get_operation_amount_sum().label("balance"))
            .select_from(Operation)
            .join(Category)
            .filter(Operation.date < date_)
            .filter(Operation.user_id == user_id)
            .first()
        )

        return result["balance"] or Decimal(0)

    def _get_operation_amount_sum(self):
        return sum(case((Category.type == CategoryType.expense, -Operation.amount), else_=Operation.amount))

    def get_expenses_by_period_and_category(
        self,
        session: Session,
        user_id: int,
        start_date: datetime.date,
        end_date: datetime.date,
        period_type: PeriodTypes = PeriodTypes.month,
    ) -> list[PeriodCategoryExpenses]:
        dates_list = func.generate_series(start_date, end_date, "1 " + period_type.value).alias("timeframe")
        timeframe_column_name = "timeframe"
        timeframe = column(timeframe_column_name)

        select_stmt = (
            select(
                func.date_trunc(period_type.value, timeframe).label(timeframe_column_name),
                Category.id.label("category_id"),
                Category.name.label("category_name"),
                Category.type.label("category_type"),
                coalesce(
                    self._get_operation_amount_sum(),
                    0,
                ).label("category_total"),
            )
            .select_from(dates_list)
            .join(
                Operation,
                and_(
                    func.date_trunc(period_type.value, Operation.date) == func.date_trunc(period_type.value, timeframe),
                    Operation.user_id == user_id,
                ),
            )
            .join(Category, Operation.category_id == Category.id)
            .where(Category.type == CategoryType.expense)
            .group_by(timeframe, Category.id)
            .order_by(func.date_trunc(period_type.value, timeframe), Category.id)
        )

        results = session.execute(select_stmt).all()
        period_category_spendings = []
        for month, group in groupby(results, lambda x: x[timeframe_column_name]):
            group_items = list(group)
            total_period_spendings = reduce(lambda x, y: x + -y["category_total"], group_items, 0)
            period_category_spendings.append(
                PeriodCategoryExpenses(
                    period_start=month,
                    period_end=get_end_of_period_date(start_date=month, period_type=period_type),
                    total_expenses=total_period_spendings,
                    category_expenses=[
                        CategoryWithExpenses(
                            id=result["category_id"],
                            name=result["category_name"],
                            type=result["category_type"],
                            expenses=result["category_total"] * -1,
                            percentage_in_period=round(-result["category_total"] / total_period_spendings * 100, 2),
                        )
                        for result in group_items
                    ],
                )
            )
        return period_category_spendings


operation = OperationCRUD(Operation)
