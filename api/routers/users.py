from fastapi import APIRouter

from api.schemas.user import UserSchema

router = APIRouter()


@router.post("/register")
def register(user: UserSchema) -> UserSchema:
    return user
