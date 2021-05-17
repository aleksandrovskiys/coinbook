from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .forms import OperationForm
from .models import User
from . import service


@csrf_exempt
def index(request):
    if request.user.is_authenticated:
        operations = service.get_user_operations(request.user).order_by('-date', '-id')
        latest_operation_account = service.get_account_of_latest_operation(request.user)
        operation_form = OperationForm(initial={'account': latest_operation_account,
                                                'type': 'out'},
                                       user=request.user)
    else:
        operations = []
        operation_form = None
    return render(request, 'finances/index.html', {
        'operations': operations,
        'operation_form': operation_form
    })


# Operations
@login_required()
@csrf_exempt
def operation_view(request, operation_id: int):
    if request.method == 'POST':
        pass
    elif request.method == 'GET':
        operation = service.get_operation(operation_id)
        return render(request, 'finances/operation.html', {
            'operation': operation
        })
    elif request.method == 'DELETE':
        service.delete_operation(operation_id)


def create_operation_view(request):
    if request.method == 'POST':
        account = service.get_account(request.POST['account'])
        category = service.get_category(request.POST['category'])
        is_necessary = True if 'is_necessary' in request.POST else False
        service.add_operation(user=request.user,
                              type=request.POST['type'],
                              account=account,
                              category=category,
                              date=request.POST['date'],
                              is_necessary=is_necessary,
                              amount=request.POST['amount'])
        return HttpResponseRedirect(reverse('index'))


# Categories
@login_required
def category_list(request):
    if request.method == 'GET':
        return render(request, 'finances/category_list.html', {
            'object_list': request.user.categories.all()
        })
    else:
        service.create_category(request.user, request.POST.get('name'))
        return HttpResponseRedirect(reverse('category-list'))


@csrf_exempt
@login_required
def categories(request, category_id: int):
    if request.method == 'DELETE':
        service.delete_category(category_id)


# Accounts
@login_required
def account_list(request):
    if request.method == 'GET':
        return render(request, 'finances/account_list.html', {
            'object_list': request.user.accounts.all()
        })
    else:
        service.create_account(request.user, request.POST.get('name'), request.POST.get('balance'))
        return HttpResponseRedirect(reverse('account-list'))


@csrf_exempt
@login_required
def accounts(request, account_id: int):
    if request.method == 'DELETE':
        service.delete_account(account_id)


# User views
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse('index'))
        else:
            return render(request, 'finances/login.html', {
                'message': 'Invalid username and/or password.'
            })
    else:
        return render(request, 'finances/login.html')


def register(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']

        password = request.POST['password']
        confirmation = request.POST['confirmation']

        if password != confirmation:
            return render(request, 'finances/register.html', {
                'message': 'Passwords must match.'
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, 'finances/register.html', {
                'message': 'Username already taken.'
            })
        login(request, user)
        return HttpResponseRedirect(reverse('index'))
    else:
        return render(request, 'finances/register.html')


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse('index'))
