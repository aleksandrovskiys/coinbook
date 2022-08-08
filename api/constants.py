import enum

from api.models.category import CategoryType
from api.models.operation import OperationType


class SwaggerTags(enum.Enum):
    ACCOUNTS = "accounts"
    CATEGORIES = "categories"
    CURRENCIES = "currencies"
    USERS = "users"
    OPERATIONS = "operations"


PERMISSION_ERROR_TEXT_TEMPLATE = "Not enough permission to access this {0}"


CATEGORY_TO_OPERATION_TYPE_MAPPING = {
    CategoryType.expense: OperationType.expense,
    CategoryType.income: OperationType.income,
}
