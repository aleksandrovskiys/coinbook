import logging
from datetime import datetime
from decimal import Decimal
from typing import Union

from django.db.models import QuerySet

from .models import User, Operation, Account, Category


def get_user_operations(user: User) -> QuerySet:
    """
    Returns all operations for specified user
    """
    if user.is_authenticated:
        user_operations = user.operations
        return user_operations.all()
    return Operation.objects.none()


def add_operation(user: User,
                  type: Operation.TYPE_CHOICES,
                  account: Account,
                  category: Category,
                  is_necessary: bool,
                  date: str,
                  amount: Decimal):
    """
    Creates new operation with specified parameters
    """
    operation = Operation(user=user, type=type, account=account, category=category,
                          date=date, is_necessary=is_necessary, amount=amount)

    if type == Operation.INCOME:
        account.balance += Decimal(amount)
    else:
        account.balance -= Decimal(amount)

    operation.save()
    account.save()


def get_operation(operation_id: int) -> Operation:
    """
    Returns an operation object with specified id. Returns None if operation not found
    :param operation_id: id of an operation
    :return: operation object
    """
    try:
        operation = Operation.objects.get(pk=operation_id)
        return operation
    except Operation.DoesNotExist:
        logging.error(f"Operation with id {operation_id} doesn't exist.")
        return None


def create_operation(user: User,
                     operation_type: str,
                     account: Account,
                     date: datetime,
                     is_necessary: bool,
                     amount: float):
    """
    Creates new operation with specified parameters
    :param user:
    :param operation_type:
    :param account:
    :param date:
    :param is_necessary:
    :param amount:
    """
    new_operation = Operation(user=user,
                          type=operation_type,
                          date=date,
                          account=account,
                          is_necessary=is_necessary,
                          amount=amount)
    new_operation.save()


def delete_operation(id: int):
    """
    Deletes an operation with specified id
    :param id:
    """
    try:
        operation = Operation.objects.get(pk=id)
        account = operation.account
        if operation.type == Operation.OUTCOME:
            account.balance += Decimal(operation.amount)
        else:
            account.balance -= Decimal(operation.amount)

        operation.delete()
        if account.operations.count() == 0:
            account.balance = 0

        account.save()
    except Operation.DoesNotExist:
        logging.log(logging.ERROR, f'Error while deleting operation: operation with id {id} not found.')


def get_account(account_id: int) -> Union[Account, None]:
    """
    Return an account with specified id. Returns None if account not found
    :param account_id:
    :return:
    """
    try:
        account = Account.objects.get(pk=account_id)
    except Account.DoesNotExist:
        logging.log(logging.ERROR, f"Error while creating operation: Account with id {account_id} not found.")
        return None
    return account


def get_account_of_latest_operation(user: User) -> Union[Account, None]:
    """
    Returns an account from latest operation of the user. Returns None if there are no operations
    :param user: user object
    :return:
    """
    operations = user.operations.order_by('-date')
    if len(operations) > 0:
        return operations[0].account
    else:
        return None


def get_user(user_id: int) -> Union[User, None]:
    """
    Returns a user with specified id. Returns None if user not found.
    :param user_id:
    :return:
    """
    try:
        return User.objects.get(user_id)
    except User.DoesNotExist:
        logging.log(logging.ERROR, f"Error while creating operation: User with id {user_id} not found.")
        return None


def get_category(category_id: int) -> Union[Category, None]:
    """
    Returns a category with specified id. Returns None if category not found.
    :param category_id:
    :return:
    """
    try:
        category = Category.objects.get(pk=category_id)
        return category
    except ValueError:
        return None
    except Category.DoesNotExist:
        logging.error(f"Category with id {category_id} doesn't exist.")
        return None


def create_category(user: User, name: str) -> None:
    """
    Creates a category with specified name for user.
    :param user:
    :param name:
    """
    category = Category.objects.create(user=user, name=name)
    category.save()


def delete_category(category_id: int):
    """
    Deletes a category with specified id
    :param category_id:
    """
    try:
        category = Category.objects.get(pk=category_id)
        category.delete()
    except Category.DoesNotExist:
        logging.log(logging.ERROR, f'Error while deleting category: category with id {category_id} not found.')


def create_account(user: User, name: str, balance: float) -> None:
    """
    Creates an account with specified name and balance for user.
    :param user:
    :param name:
    :param balance:
    """
    account = Account.objects.create(user=user, name=name, balance=balance)
    account.save()


def delete_account(account_id: int):
    """
    Deletes an account with specified id.
    :param account_id:
    """
    try:
        account = Account.objects.get(pk=account_id)
        account.delete()
    except Account.DoesNotExist:
        logging.log(logging.ERROR, f'Error while deleting account: account with id {account_id} not found.')