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
    path('follow_steps/<int:recipe_id>', views.follow_steps, name='follow_steps'),
    path('finish_recipe/<int:recipe_id>', views.finish_recipe, name='finish_recipe'),
    path('edit/<int:recipe_id>',views.edit, name='edit'),
    path('edit_title/<int:recipe_id>',views.edit_title, name='edit_title'),
    path('edit_description/<int:recipe_id>',views.edit_description, name='edit_description'),
    path('edit_ingredients/<int:recipe_id>',views.edit_ingredients, name='edit_ingredients'),


]
