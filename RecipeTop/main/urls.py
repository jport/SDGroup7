from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home', views.home, name='Home'),
    path('search',views.search, name='search')
]
