from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.models.user import User
from api.schemas.user import UserBase
from api.schemas.user import UserCreate
from api.security import get_password_hash
from api.security import verify_password


class UserCrud(CRUDBase[User, UserCreate, UserBase]):
    def __init__(self) -> None:
        self.model = User

    def create(self, session: Session, *, obj_in: UserCreate) -> User:
        obj_in = self.model(
            email=obj_in.email,
            password=get_password_hash(obj_in.password),
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
        )

        session.add(obj_in)
        session.commit()
        return obj_in

    def get_by_email(self, session: Session, email: str) -> User | None:
        user = session.query(User).filter(self.model.email == email).first()
        return user

    def authenticate(self, session: Session, *, email: str, password: str) -> User | None:
        user = self.get_by_email(session, email=email)
        if not user:
            return None

        if not verify_password(password, user.password):
            return None

        return user


user = UserCrud()
