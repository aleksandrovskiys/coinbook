from api.crud.base import CRUDBase
from api.models.category import Category
from api.schemas.category import CategoryBase
from api.schemas.category import CategoryCreate


class CategoryCrud(CRUDBase[Category, CategoryCreate, CategoryBase]):
    ...


category = CategoryCrud(Category)
