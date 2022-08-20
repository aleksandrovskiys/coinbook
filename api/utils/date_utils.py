import calendar
from datetime import datetime


def get_account_period_dates() -> tuple[datetime, datetime]:
    today = datetime.today()
    last_day_of_month = calendar.monthrange(today.year, today.month)[1]
    from_ = today.replace(day=1, hour=1, minute=1, second=1)
    to_ = datetime.today().replace(day=last_day_of_month, hour=23, minute=59, second=59)
    return from_, to_
