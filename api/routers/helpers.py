from fastapi import HTTPException
from sqlalchemy.orm import Session
from starlette import status

from api import constants
from api.crud.base import CRUDBase
from api.models.user import User


def get_and_check_permissions(session: Session, crud: CRUDBase, current_user: User, key: int | str):
    obj = get_or_404(session, crud, key)
    check_permissions(current_user, obj)

    return obj


def get_or_404(session: Session, crud: CRUDBase, key: int | str):
    obj = crud.get(session=session, id=key)
    if not obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=f"{crud.model.__name__} with id {key} not found"
        )
    return obj


def check_permissions(current_user: User, obj):
    if obj.user != current_user and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=constants.PERMISSION_ERROR_TEXT_TEMPLATE.format(obj.__class__.__name__.lower()),
        )
