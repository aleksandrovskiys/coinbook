import calendar
import datetime

from api.schemas.reports import PeriodTypes


def get_account_period_dates() -> tuple[datetime.datetime, datetime.datetime]:
    today = datetime.datetime.today()
    last_day_of_month = calendar.monthrange(today.year, today.month)[1]
    from_ = today.replace(day=1, hour=1, minute=1, second=1)
    to_ = datetime.datetime.today().replace(day=last_day_of_month, hour=23, minute=59, second=59)
    return from_, to_


def get_end_of_period_date(start_date: datetime.date, period_type: PeriodTypes) -> datetime.date:
    return start_date + period_type.get_relative_delta() - datetime.timedelta(days=1)
