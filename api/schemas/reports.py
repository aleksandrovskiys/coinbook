import datetime
from decimal import Decimal
from enum import Enum

from dateutil import relativedelta
from pydantic import BaseModel
from pydantic import Field

from api.schemas.category import CategoryWithExpenses


class PeriodTypes(Enum):
    day = "day"
    week = "week"
    month = "month"

    def get_relative_delta(self):
        if self == PeriodTypes.day:
            return relativedelta.relativedelta(days=1)
        elif self == PeriodTypes.week:
            return relativedelta.relativedelta(weeks=1)
        elif self == PeriodTypes.month:
            return relativedelta.relativedelta(months=1)


class SpendInPeriodSchema(BaseModel):
    period: datetime.date
    amount: Decimal = Decimal(0)


class NetWorthReport(BaseModel):
    data: list[SpendInPeriodSchema]
    period_type: PeriodTypes = PeriodTypes.day


class PeriodCategoryExpenses(BaseModel):
    period_start: datetime.date
    period_end: datetime.date
    category_expenses: list[CategoryWithExpenses]
    total_expenses: Decimal = Field(default=Decimal(0))
