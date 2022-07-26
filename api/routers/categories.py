from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from api import crud
from api import deps
from api.models.user import User
from api.schemas.category import CategoryBase
from api.schemas.category import CategoryInDB

router = APIRouter()


@router.get("")
def get_user_categories(current_user: User = Depends(deps.get_current_user)) -> list[CategoryInDB]:
    return sorted([CategoryInDB.from_orm(category) for category in current_user.categories], key=lambda x: x.id)


@router.post("")
def create_category(
    category: CategoryBase, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> CategoryInDB:
    return CategoryInDB.from_orm(crud.category.create(session=session, category=category, user=current_user))


@router.put("/{category_id}")
def update_category(
    category_id: int,
    category: CategoryBase,
    current_user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
) -> CategoryInDB:
    category_obj = crud.category.get(session=session, category_id=category_id)
    if not category_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category with specified id not found in Database"
        )

    if category_obj.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not enough permission to edit this category"
        )

    return CategoryInDB.from_orm(crud.category.update(session=session, category=category, category_obj=category_obj))


@router.get("/{category_id}")
def get_category(
    category_id: int, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> CategoryInDB:
    category = crud.category.get(session=session, category_id=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category with specified id not found in Database"
        )

    if category.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not enough permission to view this category"
        )

    return CategoryInDB.from_orm(category)
