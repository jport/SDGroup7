from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from .models import *

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
        age = request.POST['age']

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
        # Create the recipe
        r = Recipe(
            title=request.POST['title'],
            description=request.POST['description'],
            # TODO: Add other fields
        )

        # Save the recipe to create the id
        r.save()

        # Create new ingredients only
        ingredients = request.POST.getlist('ingredient')
        quanties = request.POST.getlist('quantity')
        units = request.POST.getlist('unit')

        for i in range(0, len(ingredients)):
            ing = Ingredient.objects.get_or_create(name__iexact=ingredients[i])[0]
            repToIng = RecipeToIngredient(
                recipe = r,
                ingredient = ing,
                quantity = quanties[i],
                unit = units[i]
            )

            repToIng.save()


        # Create new utensils
        utensils = request.POST.getlist('utensil')

        for i in range(0, len(utensils)):
            uten = Utensil.objects.get_or_create(name__iexact = utensils[i])[0]
            r.utensils.add(uten)

        # Create new keywords
        tags = request.POST.getlist('tags')

        for i in range(0, len(tags)):
            tag = Keyword.objects.get_or_create(name__iexact = tags[i])[0]
            r.keywords.add(tag)

        # Create steps
        steps = request.POST.getlist('step')

        for i in range(0, len(steps)):
            step = RecipeStep(
                recipe = r,
                stepNumber = i+1,
                text = steps[i]
            )

            step.save()

        return redirect('/home')
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

def follow_steps(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)

    context = {
        'recipe':recipe,
        'units':["cup(s)", "kg", "grams", "lbs", "ounces", "ml", "units", "tbsp", "tsp", "handfuls"]
        
    }
    return render(request, 'main/follow_steps.html',context)
