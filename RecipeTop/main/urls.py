from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('users', views.users, name='users'),
    path('home', views.home, name='Home'),
    path('home/<int:userId>', views.home, name='Home'),
    path('create', views.create, name='create'),
    path('search', views.search, name='search'),
    path('sensor', views.sensor, name='sensor'),
    path('hearted', views.hearted, name='hearted'),
    path('follow/<int:recipe_id>', views.follow, name='follow')

]
