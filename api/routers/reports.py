from datetime import date

from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from api import constants
from api import deps
from api.models import User
from api.schemas.reports import PeriodTypes
from api.services.reports import ReportsService

router = APIRouter(tags=[constants.SwaggerTags.CATEGORIES])


@router.get("/net_worth")
def net_worth_report(
    start_date: date,
    end_date: date,
    period_type: PeriodTypes = PeriodTypes.day,
    user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
):
    reports_service = ReportsService(user, session, start_date=start_date, end_date=end_date)
    return reports_service.net_worth_report(period_type=period_type)
