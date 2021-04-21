from django.urls import path
from . import views
from .views import CategoryListView

urlpatterns = [
    path('login', views.login_view, name='login'),
    path('logout', views.logout_view, name='logout'),
    path('register', views.register, name='register'),

    path('operations/<int:operation_id>/', views.operation_view, name='operation'),
    path('operations/', views.create_operation_view, name='operations'),

    path('categories/<int:category_id>/', views.categories, name='categories'),
    path('categories/', views.category_list, name='category-list'),

    path('', views.index, name='index'),
]
