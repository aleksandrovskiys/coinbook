from sqlalchemy.orm import Session

from api.models.user import User
from api.schemas.user import UserCreate
from api.security import get_password_hash


class UserCrud:
    def __init__(self) -> None:
        self.model = User

    def get_by_email(self, session: Session, email: str) -> User | None:
        user = session.query(User).filter(self.model.email == email).first()
        return user

    def get(self, session: Session, id: int):
        return session.query(self.model).filter(self.model.id == id).first()

    def create(self, session: Session, user: UserCreate) -> User:
        user = self.model(
            email=user.email, password=get_password_hash(user.password), first_name=user.first_name, last_name=user.last_name
        )

        session.add(user)
        session.commit()
        return user


user = UserCrud()
