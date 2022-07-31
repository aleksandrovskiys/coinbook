from fastapi import APIRouter
from fastapi import Body
from fastapi import Depends
from fastapi import Path
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException

from api import crud
from api import deps
from api.models.user import User
from api.schemas.currency import CurrencyBase

router = APIRouter()


@router.get("", response_model=list[CurrencyBase])
def get_currencies(session: Session = Depends(deps.get_db), _: User = Depends(deps.get_current_user)):
    return [CurrencyBase.from_orm(currency) for currency in crud.currency.get_all(session=session)]


@router.post(
    "", response_model=CurrencyBase, status_code=status.HTTP_201_CREATED, dependencies=Depends(deps.is_superuser)
)
def create_currency(currency: CurrencyBase = Body(), session: Session = Depends(deps.get_db)):
    if crud.currency.get(session, currency.code):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Currency with code '{currency.code}' already exists",
        )

    return CurrencyBase.from_orm(crud.currency.create(session=session, obj_in=currency))


@router.get("/{code}", response_model=CurrencyBase, dependencies=[Depends(deps.get_current_user)])
def get_currency(code: str = Path(max_length=5), session: Session = Depends(deps.get_db)):
    currency = crud.currency.get(session=session, code=code)
    if not currency:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Currency with code '{code}' not found")

    return CurrencyBase.from_orm(currency)


@router.delete("/{code}", dependencies=[Depends(deps.is_superuser)])
def delete_currency(code: str, session: Session = Depends(deps.get_db)):
    currency = crud.currency.get(session=session, code=code)
    if not currency:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Currency with code '{code}' not found")

    return CurrencyBase.from_orm(crud.currency.remove_obj(session=session, obj=currency))
