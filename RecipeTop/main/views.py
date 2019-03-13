from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import Recipe, User, Ingredient, Utensil

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def home(request, userId=-1):
    # Set session user id
    if userId != -1:
        request.session["userId"] = userId

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
    if request.method == 'POST':
        print(request.POST)
        return redirect('/create')
    else:
        context = {
            'ingredients':Ingredient.objects.all(),
            'utensils': Utensil.objects.all()
        }
        return render(request, 'main/create.html',context)

def search(request):
    query_list = Recipe.objects.all()

    #difficulty
    if 'difficulty' in request.GET:
        difficulty = request.GET['difficulty']
        if difficulty:
            query_list = query_list.filter(difficulty = difficulty)
    #rating
    if 'rating' in request.GET:
        rating = request.GET['rating']
        if rating:
            query_list = query_list.filter(rating = rating)
    
    context = {
        'hearted': Recipe.objects.filter(user__id=request.session["userId"]),
        'recipes': Recipe.objects.exclude(user__id=request.session["userId"]),
        'filter':query_list,
        'values':request.GET

    }
    return render(request, 'main/search.html', context)

def sensor(request):
    context = {
        'reading': 99
    }

    return render(request, 'main/sensor.html', context)

def hearted(request):
    context ={
        'hearted': Recipe.objects.filter(user__id=request.session["userId"])
    }
    return render(request, 'main/search.html',context)

def follow(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)

    context = {
        'recipe':recipe
    }
    return render(request, 'main/follow.html',context)
