from api.crud.base import CRUDBase
from api.models.account import Account
from api.schemas.account import AccountBase
from api.schemas.account import AccountCreate


class AccountCrud(CRUDBase[Account, AccountCreate, AccountBase]):
    ...


account = AccountCrud(Account)
