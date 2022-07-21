from fastapi import APIRouter

from api.fastapi_models.user import UserModel

router = APIRouter()


@router.post("/register")
def register(user: UserModel) -> UserModel:
    return user
