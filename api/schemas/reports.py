import datetime
from decimal import Decimal
from enum import Enum

from pydantic import BaseModel


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
