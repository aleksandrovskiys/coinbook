from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from starlette import status

from api import constants
from api import crud
from api import deps
from api.models.user import User
from api.routers.helpers import get_and_check_permissions
from api.schemas.operation import Operation
from api.schemas.operation import OperationBase
from api.schemas.operation import OperationCreate
from api.schemas.operation import OperationDelete

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
    operation: OperationBase,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    operation_obj = get_and_check_permissions(
        session=session, crud=crud.operation, current_user=current_user, key=operation_id
    )

    return crud.operation.update(session=session, db_obj=operation_obj, obj_in=operation)


@router.delete("/{operation_id}", response_model=OperationDelete)
def delete_operation(
    operation_id: str,
    session: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
):
    operation = get_and_check_permissions(
        session=session, crud=crud.operation, current_user=current_user, key=operation_id
    )

    return crud.operation.remove_obj(session=session, obj=operation)
