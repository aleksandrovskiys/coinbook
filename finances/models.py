import datetime

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Account(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='accounts')
    name = models.CharField(max_length=50, verbose_name='Account')
    balance = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f'{self.user}: {self.name} ({self.balance})'


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=50, default='')

    def __str__(self):
        return self.name


class Operation(models.Model):
    INCOME = 'in'
    OUTCOME = 'out'
    TYPE_CHOICES = (
        (INCOME, 'Income'),
        (OUTCOME, 'Outcome'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='operations')
    type = models.CharField(max_length=3, choices=TYPE_CHOICES)
    date = models.DateTimeField(default=datetime.datetime(2021, 1, 1, 0, 0, 0))
    account = models.ForeignKey(Account, on_delete=models.CASCADE,
                                related_name='operations')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, related_name='operations', null=True)
    is_necessary = models.BooleanField(verbose_name='Is necessary')
    amount = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return f'{self.user} {self.type}, {self.amount}'
