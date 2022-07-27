from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from api import crud
from api import deps
from api.models.user import User
from api.schemas.account import AccountBase
from api.schemas.account import AccountCreate
from api.schemas.account import AccountInDB

router = APIRouter()


@router.get("", response_model=list[AccountInDB])
def get_user_accounts(current_user: User = Depends(deps.get_current_user)) -> list[AccountInDB]:
    return [AccountInDB.from_orm(account) for account in current_user.accounts]


@router.post("", status_code=status.HTTP_201_CREATED, response_model=AccountInDB)
def create_account(
    account: AccountBase, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> AccountInDB:
    account_obj = AccountCreate(name=account.name, user_id=current_user.id)
    return AccountInDB.from_orm(crud.account.create(session=session, obj_in=account_obj))


@router.put("/{account_id}", response_model=AccountInDB)
def update_account(
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
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permission to edit this account")

    return AccountInDB.from_orm(crud.account.update(session=session, obj_in=account, db_obj=account_obj))


@router.get("/{account_id}", response_model=AccountInDB)
def get_account(
    account_id: int, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> AccountInDB:
    account = crud.account.get(session=session, id=account_id)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account with specified id not found in Database"
        )

    if account.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permission to view this account")

    return AccountInDB.from_orm(account)
