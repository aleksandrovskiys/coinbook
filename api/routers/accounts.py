from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from api import constants
from api import crud
from api import deps
from api.models.user import User
from api.schemas.account import Account
from api.schemas.account import AccountCreate
from api.schemas.account import AccountInDB
from api.schemas.account import AccountUpdate

router = APIRouter(tags=[constants.SwaggerTags.ACCOUNTS])


@router.get("", response_model=list[Account])
async def get_user_accounts(
    current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> list[Account]:
    return [Account.from_orm(account) for account in crud.account.get_user_accounts(session=session, user=current_user)]


@router.post("", status_code=status.HTTP_201_CREATED, response_model=Account)
async def create_account(
    account: AccountCreate, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> Account:
    return crud.account.create(session=session, obj_in=account)


@router.put("/{account_id}", response_model=Account)
async def update_account(
    account_id: int,
    account: AccountUpdate,
    current_user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
) -> Account:
    account_obj = crud.account.get(session=session, id=account_id)
    if not account_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account with specified id not found in Database"
        )

    if account_obj.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=constants.PERMISSION_ERROR_TEXT_TEMPLATE)

    return crud.account.update(session=session, obj_in=account, db_obj=account_obj)


@router.get("/{account_id}", response_model=AccountInDB)
async def get_account(
    account_id: int, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> AccountInDB:
    account = crud.account.get(session=session, id=account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account with specified id not found in Database"
        )

    if account.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=constants.PERMISSION_ERROR_TEXT_TEMPLATE)

    return AccountInDB.from_orm(account)
