from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from sqlalchemy.orm import Session

from api import crud
from api import deps
from api.schemas.user import User
from api.schemas.user import UserCreate

router = APIRouter()


@router.post("/register")
def register(
    user: UserCreate,
    session: Session = Depends(deps.get_db),
) -> User:
    if crud.user.get_by_email(session=session, email=user.email):
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    created_user = crud.user.create(user=user, session=session)
    return created_user
