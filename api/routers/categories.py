from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status
from sqlalchemy.orm import Session

from api import crud
from api import deps
from api.models.user import User
from api.schemas.category import CategoryBase
from api.schemas.category import CategoryCreate
from api.schemas.category import CategoryInDB

router = APIRouter()


@router.get("", response_model=list[CategoryInDB])
async def get_user_categories(current_user: User = Depends(deps.get_current_user)) -> list[CategoryInDB]:
    return [CategoryInDB.from_orm(category) for category in current_user.categories]


@router.post("", status_code=status.HTTP_201_CREATED, response_model=CategoryInDB)
async def create_category(
    category: CategoryBase, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> CategoryInDB:
    category_obj = CategoryCreate(name=category.name, user_id=current_user.id)
    return CategoryInDB.from_orm(crud.category.create(session=session, obj_in=category_obj))


@router.put("/{category_id}", response_model=CategoryInDB)
async def update_category(
    category_id: int,
    category: CategoryBase,
    current_user: User = Depends(deps.get_current_user),
    session: Session = Depends(deps.get_db),
) -> CategoryInDB:
    category_obj = crud.category.get(session=session, id=category_id)
    if not category_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category with specified id not found in Database"
        )

    if category_obj.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permission to edit this category")

    return CategoryInDB.from_orm(crud.category.update(session=session, obj_in=category, db_obj=category_obj))


@router.get("/{category_id}", response_model=CategoryInDB)
async def get_category(
    category_id: int, current_user: User = Depends(deps.get_current_user), session: Session = Depends(deps.get_db)
) -> CategoryInDB:
    category = crud.category.get(session=session, id=category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Category with specified id not found in Database"
        )

    if category.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permission to view this category")

    return CategoryInDB.from_orm(category)
