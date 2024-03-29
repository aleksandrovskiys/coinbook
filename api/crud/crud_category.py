from datetime import datetime
from decimal import Decimal

from sqlalchemy import case
from sqlalchemy import func
from sqlalchemy.orm import Session

from api.crud.base import CRUDBase
from api.models.category import Category
from api.models.category import CategoryType
from api.models.operation import Operation
from api.schemas.category import Category as CategorySchema
from api.schemas.category import CategoryBase
from api.schemas.category import CategoryCreate
from api.utils.date_utils import get_account_period_dates


class CategoryCrud(CRUDBase[Category, CategoryCreate, CategoryBase]):
    def get_user_categories(self, session: Session, user_id: int) -> list[CategorySchema]:
        orm_categories = (
            session.query(Category)
            .filter(
                Category.user_id == user_id,
            )
            .all()
        )

        from_, to_ = get_account_period_dates()
        categories = []
        for orm_category in orm_categories:
            category = CategorySchema.from_orm(orm_category)
            category.month_expenses = self.category_balance_in_period(
                session=session,
                category=category,
                from_=from_,
                to_=to_,
            )
            categories.append(category)

        return categories

    def category_balance_in_period(
        self, session: Session, category: CategorySchema, from_: datetime, to_: datetime
    ) -> Decimal:
        result = (
            session.query(
                func.sum(
                    case((Category.type == CategoryType.expense, -Operation.amount), else_=Operation.amount)
                ).label("balance")
            )
            .join(Category)
            .where(Operation.category_id == category.id)
            .where(Operation.date >= from_)
            .where(Operation.date < to_)
            .first()
        )

        if not result["balance"]:
            return Decimal(0)

        return result["balance"] * (-1 if category.type == CategoryType.expense else 1)

    def get_balance_correction_category(self, session: Session) -> Category:
        return session.query(Category).filter(Category.type == CategoryType.balance_correction).first()


category = CategoryCrud(Category)
