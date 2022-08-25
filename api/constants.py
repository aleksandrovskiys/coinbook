import enum


class SwaggerTags(enum.Enum):
    ACCOUNTS = "accounts"
    CATEGORIES = "categories"
    CURRENCIES = "currencies"
    USERS = "users"
    OPERATIONS = "operations"


PERMISSION_ERROR_TEXT_TEMPLATE = "Not enough permission to access this {0}"
