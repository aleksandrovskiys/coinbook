from dataclasses import dataclass
from datetime import date

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from api import constants
from api import deps
from api.models import User
from api.schemas.reports import PeriodCategoryExpenses
from api.schemas.reports import PeriodTypes
from api.services.reports import ReportsService

router = APIRouter(tags=[constants.SwaggerTags.CATEGORIES])


@dataclass
class ReportDates:
    start_date: date
    end_date: date


async def report_dates(start_date: date, end_date: date) -> ReportDates:
    if start_date >= end_date:
        raise HTTPException(status_code=422, detail="Start date must be before end date")

    return ReportDates(start_date=start_date, end_date=end_date)


@router.get("/net_worth")
def net_worth_report(
    dates: ReportDates = Depends(report_dates),
    period_type: PeriodTypes = PeriodTypes.day,
    user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
):
    reports_service = ReportsService(user, session, start_date=dates.start_date, end_date=dates.end_date)
    return reports_service.net_worth_report(period_type=period_type)


@router.get("/expenses", response_model=list[PeriodCategoryExpenses])
def expenses_report(
    dates: ReportDates = Depends(report_dates),
    period_type: PeriodTypes = PeriodTypes.month,
    user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
):
    reports_service = ReportsService(user, session, start_date=dates.start_date, end_date=dates.end_date)
    return reports_service.expenses_report(period_type=period_type)
