from django.shortcuts import render
from django.http import HttpResponse
from .models import Recipe, User, Ingredient, Utensil

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def home(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    
    return render(request, 'main/home.html',context)

def users(request):
    err = ''
    if request.method == 'POST':
        name = request.POST['name']
        age= request.POST['age']

        if User.objects.all().filter(userName=name).count() != 0:
            err = "Sorry User is taken"
        else:
            newUser = User(userName=name, age=age)
            newUser.save()

    context = {
        'users': User.objects.all(),
        'error': err
    }

    return render(request, 'main/users.html', context)
    
def create(request):
    context = {
        'ingredients':Ingredient.objects.all(),
        'utensils': Utensil.objects.all()
    }
    return render(request, 'main/create.html',context)

def search(request):
    context = {
        'recipes': Recipe.objects.all()
    }
    return render(request, 'main/search.html', context)

def sensor(request):
    context = {
        'reading': 99
    }

    return render(request, 'main/sensor.html', context)

def hearted(request):
    context ={
        'recipes': Recipe.objects.all()
    }
    return render(request, 'main/hearted.html',context)
