from django.shortcuts import render
from django.http import HttpResponse
from .models import Recipe, User

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def home(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    
    return render(request, 'main/home.html',context)

def users(request):
    context = {
        'users': User.objects.all()
    }

    return render(request, 'main/users.html', context)
    
def create(request):
    context = {
        'ingredients':Recipe.objects.all
    }
    return render(request, 'main/create.html',context)

def search(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    
    return render(request, 'main/search.html', context)