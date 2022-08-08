from api.crud.base import CRUDBase
from api.models.operation import Operation
from api.schemas.operation import OperationCreate


class OperationCRUD(CRUDBase[Operation, OperationCreate, OperationCreate]):
    ...


operation = OperationCRUD(Operation)
