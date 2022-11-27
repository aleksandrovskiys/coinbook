from datetime import date
from datetime import timedelta
from itertools import accumulate

from sqlalchemy.orm import Session

from api import crud
from api.models.user import User
from api.schemas.reports import NetWorthReport
from api.schemas.reports import PeriodTypes
from api.schemas.reports import SpendInPeriodSchema


class ReportsService:
    def __init__(self, user: User, session: Session, *, start_date: date, end_date: date) -> None:
        self.start_date = start_date
        self.end_date = end_date
        self.user = user
        self.session = session

    def net_worth_report(self, period_type: PeriodTypes) -> NetWorthReport:
        start_balance = crud.operation.get_balance_to_date(self.session, self.user.id, self.start_date)
        balance_changes = crud.operation.get_balance_change_by_period(
            self.session,
            user_id=self.user.id,
            start_date=self.start_date,
            end_date=self.end_date,
            period_type=period_type,
        )

        def cumsum_spend_in_period(total: SpendInPeriodSchema, element: SpendInPeriodSchema) -> SpendInPeriodSchema:
            return SpendInPeriodSchema(period=element.period, amount=element.amount + total.amount)

        accumulated_sums = list(
            accumulate(
                balance_changes,
                func=cumsum_spend_in_period,
                initial=SpendInPeriodSchema(period=balance_changes[0].period - timedelta(days=1), amount=start_balance),
            )
        )

        return NetWorthReport(data=accumulated_sums, period_type=period_type)
