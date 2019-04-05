from django.urls import path
from . import views

urlpatterns = [
    path('changeHeartStatus', views.changeHeartStatus),
    path('finishRecipe', views.finishRecipe)
]