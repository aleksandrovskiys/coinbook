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
from api.schemas.account import AccountBase
from api.schemas.account import AccountCreate
from api.schemas.account import AccountInDB

router = APIRouter(tags=[constants.SwaggerTags.ACCOUNTS])


@router.get("", response_model=list[Account])
async def get_user_accounts(
    current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> list[Account]:
    return crud.account.get_user_accounts(session=session, user=current_user)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=AccountInDB)
async def create_account(
    account: AccountBase, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> AccountInDB:
    account_obj = AccountCreate(name=account.name, user_id=current_user.id)
    return AccountInDB.from_orm(crud.account.create(session=session, obj_in=account_obj))


@router.put("/{account_id}", response_model=AccountInDB)
async def update_account(
    account_id: int,
    account: AccountBase,
    current_user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
) -> AccountInDB:
    account_obj = crud.account.get(session=session, id=account_id)
    if not account_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account with specified id not found in Database"
        )

    if account_obj.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=constants.PERMISSION_ERROR_TEXT_TEMPLATE)

    return AccountInDB.from_orm(crud.account.update(session=session, obj_in=account, db_obj=account_obj))


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
