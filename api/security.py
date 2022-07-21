from datetime import datetime
from datetime import timedelta

import jwt
from passlib.context import CryptContext

from api.settings import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

ALGORITHM = "HS256"


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(subject: str, expires_delta: timedelta) -> str:
    expires = datetime.utcnow() + expires_delta if expires_delta else timedelta(settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode = {"exp": expires, "sub": str(subject)}
    encoded_jwt = jwt.encode(
        payload=to_encode,
        key=settings.SECRET_KEY,
        algorithm=ALGORITHM,
    )

    return encoded_jwt
