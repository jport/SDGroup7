from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.db.models import Count
from .models import *

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def home(request, userId=-1):
    # Set session user id
    if userId != -1:
        request.session["userId"] = userId

    context = {
        'recipes': Recipe.objects.all(),
        'suggestions': Recipe.objects.all()[:3],
        'user': User.objects.get(pk=request.session["userId"]),

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
        
        if not 'recipe_image' in request.FILES:
            r = Recipe(
                title=request.POST['title'],
                description=request.POST['description'],
                rating = request.POST['rating'],
                estDuration = request.POST['time'],
                difficulty = request.POST['difficulty']
                
                #image = request.FILES['recipe_image']

                # TODO: Add other fields
            )

            #TODO add validation for iamge, save a defualt image if the file chosen doesnt exist?

        # Create the recipe
        else:
            r = Recipe(
                title=request.POST['title'],
                description=request.POST['description'],
                image = request.FILES['recipe_image'],
                rating = request.POST['rating'],
                estDuration = request.POST['time'],
                difficulty = request.POST['difficulty']
                

                # TODO: Add other fields
            )

        # Save the recipe to create the id
        r.save()

        # Create new ingredients only
        ingredients = request.POST.getlist('ingredient')
        print(ingredients)
        quanties = request.POST.getlist('quantity')
        units = request.POST.getlist('unit')

        for i in range(0, len(ingredients)):
            ing = Ingredient.objects.get_or_create(name__iexact = ingredients[i], defaults={'name':ingredients[i]})[0]
            repToIng = RecipeToIngredient(
                recipe = r,
                ingredient = ing,
                quantity = quanties[i],
                unit = units[i]
            )

            repToIng.save()


        # Create new utensils
        utensils = request.POST.getlist('utensils')

        for i in range(0, len(utensils)):
            uten = Utensil.objects.get_or_create(name__iexact = utensils[i], defaults={'name':utensils[i]})[0]
            r.utensils.add(uten)

        # Create new keywords
        tags = request.POST.getlist('tags')

        for i in range(0, len(tags)):
            tag = Keyword.objects.get_or_create(name__iexact = tags[i], defaults={'name':tags[i]})[0]
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
    print(request.method)
    print(request.GET)

    recipes = Recipe.objects.all()

    if 'search' in request.GET and request.GET['search']:
        searchText = request.GET['search']
        print(searchText)

        titleResults = Recipe.objects.filter(title__icontains=searchText)
        descResults = Recipe.objects.filter(description__icontains=searchText)
        stepResults = Recipe.objects.filter(steps__text__icontains=searchText)
        ingResults = Recipe.objects.filter(ingredients__name__icontains=searchText)
        utilResults = Recipe.objects.filter(utensils__name__icontains=searchText)

        recipes = titleResults | descResults | stepResults | ingResults | utilResults
        recipes = recipes.distinct()

    if 'rating' in request.GET:
        ratingValue = request.GET['rating']
        recipes = recipes.filter(rating=ratingValue)

    if 'difficulty' in request.GET:
        difficultyValue = request.GET['difficulty']
        recipes = recipes.filter(difficulty=difficultyValue)

    if 'search_time' in request.GET:
        searchValue = request.GET['search_time']
        recipes = recipes.filter(estDuration__lte=searchValue)

    if 'utensils' in request.GET:
        utenList = request.GET.getlist('utensils')
        recipes = recipes.filter(utensils__name__in=utenList)

    if 'ingredients' in request.GET:
        ingList = request.GET.getlist('ingredients')
        recipes = recipes.filter(ingredients__name__in=ingList)

    recipes = recipes.distinct()
    
    context = {
        'recipes': recipes,
        'ingredients':Ingredient.objects.all(),
        'utensils': Utensil.objects.all(),
        'user': User.objects.get(pk=request.session["userId"]),
        'tags': Keyword.objects.annotate(num_rep=Count('recipe')).order_by('num_rep').reverse()[:5]

    }
    return render(request, 'main/search.html', context)

def sensor(request):
    context = {
        'reading': 99
    }

    return render(request, 'main/sensor.html', context)

def hearted(request):
    context ={
        'recipes': Recipe.objects.filter(user__id=request.session["userId"]),
        'user': User.objects.get(pk=request.session["userId"]),
        'ingredients':Ingredient.objects.all(),
        'utensils': Utensil.objects.all(),
        'tags': Keyword.objects.all()

    }
    return render(request, 'main/search.html',context)

def follow_steps(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)
    #steps = get_object_or_404(RecipeStep,pk=recipe_id)

    context = {
        'recipe':recipe
        
    }
    return render(request, 'main/follow_steps.html',context)

def edit(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)

    
    context = {
        'recipe':recipe,
        'user': User.objects.get(pk=request.session["userId"]),
        'ingredients':Ingredient.objects.all(),
        'utensils': Utensil.objects.all()

    }
    return render(request, 'main/edit.html', context)

def finish_recipe(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)
    #steps = get_object_or_404(RecipeStep,pk=recipe_id)

    context = {
        'recipe':recipe
        
    }
    return render(request, 'main/finish_recipe.html',context)
