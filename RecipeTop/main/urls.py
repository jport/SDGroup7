from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users', views.users, name='users'),
    path('home', views.home, name='Home'),
    path('create', views.create, name='create'),
    path('search',views.search, name='search')
]
