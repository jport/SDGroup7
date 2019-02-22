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

    return render(request, 'main/create.html')

def search(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    
    return render(request, 'main/search.html', context)