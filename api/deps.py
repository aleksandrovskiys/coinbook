from typing import Generator

import jwt
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from fastapi.security import OAuth2PasswordBearer
from pydantic import ValidationError
from sqlalchemy.orm import Session

from api import crud
from api import models
from api import security
from api.db.session import SessionLocal
from api.schemas.token import TokenPayload
from api.settings import settings

reusable_oauth2 = OAuth2PasswordBearer(tokenUrl="/users/login/access-token")


def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


def get_current_user(session: Session = Depends(get_db), token: str = Depends(reusable_oauth2)) -> models.User:
    try:
        payload = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=[security.ALGORITHM])
        token_data = TokenPayload(**payload)
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials",
        )

    user = crud.user.get(session=session, user_id=token_data.sub)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_UNAUTHORIZED, detail="User not found")

    return user


def is_superuser(current_user: models.User = Depends(get_current_user)) -> None:
    if not current_user.is_superuser:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Only superuser can do this action.")
