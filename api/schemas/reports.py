import datetime
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel
from pydantic import Field

from api.schemas.category import CategoryWithExpenses


class PeriodTypes(Enum):
    day = "day"
    week = "week"
    month = "month"
    quarter = "quarter"


class SpendInPeriodSchema(BaseModel):
    period: datetime.date
    amount: Decimal = Decimal(0)


class NetWorthReport(BaseModel):
    data: list[SpendInPeriodSchema]
    period_type: PeriodTypes = PeriodTypes.day


class PeriodCategoryExpenses(BaseModel):
    period: datetime.date
    category_spendings: list[CategoryWithExpenses]
    total_expenses: Decimal = Field(default=Decimal(0))
