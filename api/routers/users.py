from datetime import timedelta

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from api import constants
from api import crud
from api import deps
from api.schemas.user import User
from api.schemas.user import UserCreate
from api.schemas.user import UserLoginResponseSchema
from api.security import create_access_token
from api.settings import settings

router = APIRouter(tags=[constants.SwaggerTags.USERS])


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=User)
async def register(
    user: UserCreate,
    session: Session = Depends(deps.get_db),
) -> User:
    if crud.user.get_by_email(session=session, email=user.email):
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    created_user = crud.user.create(user=user, session=session)
    return created_user


@router.post("/login/access-token", response_model=UserLoginResponseSchema)
async def login(session: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.user.authenticate(session, email=form_data.username, password=form_data.password)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect email or password ")

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return UserLoginResponseSchema(  # nosec
        access_token=create_access_token(subject=user.id, expires_delta=access_token_expires),
        token_type="bearer",
        user=User.from_orm(user),
    )


@router.get("/me", response_model=User)
async def get_user(current_user: User = Depends(deps.get_current_user)) -> User:
    return User.from_orm(current_user)
