from sqlalchemy.orm import Session

from api.models.category import Category
from api.schemas.category import CategoryBase
from api.schemas.category import CategoryInDB
from api.schemas.user import UserInDBBase


class CategoryCrud:
    def __init__(self) -> None:
        self.model = Category

    def get(self, session: Session, category_id: int) -> Category | None:
        return session.query(self.model).get(category_id)

    def create(self, session: Session, category: CategoryBase, user: UserInDBBase) -> CategoryInDB:
        category = self.model(
            name=category.name,
            user_id=user.id,
        )
        session.add(category)
        session.commit()
        return CategoryInDB.from_orm(category)

    def update(self, session: Session, category: CategoryBase, category_obj: Category) -> CategoryInDB:
        category_obj.name = category.name
        session.add(category_obj)
        session.commit()
        return CategoryInDB.from_orm(category_obj)


category = CategoryCrud()
