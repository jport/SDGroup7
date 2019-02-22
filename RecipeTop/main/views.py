from django.shortcuts import render
from django.http import HttpResponse
from .models import Recipe

# Create your views here.

def index(request):
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/index.html')

def home(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/home.html',context)

def users(request):
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/users.html')
    
def create(request):
    context = {
        'ingredients':Recipe.objects.all
    }
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/create.html',context)

def search(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/search.html', context)