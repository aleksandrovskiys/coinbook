from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status
from starlette.exceptions import HTTPException

from api import constants
from api import crud
from api import deps
from api.models.operation import OperationType
from api.models.user import User
from api.routers.helpers import get_and_check_permissions
from api.schemas.operation import Operation
from api.schemas.operation import OperationBase
from api.schemas.operation import OperationCreate

router = APIRouter(tags=[constants.SwaggerTags.OPERATIONS])


@router.get("", response_model=list[Operation])
def get_operations(current_user: User = Depends(deps.get_current_user)):
    return current_user.operations


@router.post(
    "",
    status_code=status.HTTP_201_CREATED,
    response_model=Operation,
    dependencies=[Depends(deps.get_current_user)],
)
def create_operation(
    operation: OperationBase,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    get_and_check_permissions(session, crud.account, current_user, key=operation.account_id)

    if not operation.category_id and operation.type != OperationType.balance_correction:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, detail="Empty category allowed only for 'balance_correction' operations."
        )

    if operation.category_id:
        category = get_and_check_permissions(session, crud.category, current_user, key=operation.category_id)
        if category and constants.CATEGORY_TO_OPERATION_TYPE_MAPPING.get(category.type) != operation.type:
            raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Operation type doesn't match category type")

    operation = OperationCreate(**operation.dict(), user_id=current_user.id)
    operation.user_id = current_user.id

    return crud.operation.create(session=session, obj_in=operation)


@router.get(
    "/{operation_id}",
    response_model=Operation,
    dependencies=[Depends(deps.get_current_user)],
)
def get_operation(
    operation_id: str,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    operation = get_and_check_permissions(
        session=session, crud=crud.operation, current_user=current_user, key=operation_id
    )

    return operation


@router.put("/{operation_id}", response_model=Operation)
def update_operation(
    operation_id: str,
    operation: OperationCreate,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    operation_obj = get_and_check_permissions(
        session=session, crud=crud.operation, current_user=current_user, key=operation_id
    )

    return crud.operation.update(session=session, db_obj=operation_obj, obj_in=operation)


@router.delete("/{operation_id}", response_model=Operation)
def delete_operation(
    operation_id: str,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    operation = get_and_check_permissions(
        session=session, crud=crud.operation, current_user=current_user, key=operation_id
    )

    crud.operation.remove_obj(session=session, obj=operation)
