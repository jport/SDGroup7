from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse,HttpResponseRedirect
from django.urls import reverse
from django.db.models import Count, F, FloatField
from .models import *
from django.utils import timezone
import random

# Weights:
HEARTED_WEIGHT = 5
RATING_WEIGHT = 1
DIFFICULTY_WEIGHT = 2
KEYWORD_RATING = 1

# Create your views here.

def index(request):
    return render(request, 'main/index.html')

def user_preferences(request):
    currentId = request.session["userId"]
    user=get_object_or_404(User,pk=currentId)

    if request.method == 'POST':
        cheese=request.POST['cheese']
        steak=request.POST['steak']
        fast_food=request.POST['fast_food']
        cupcake=request.POST['cupcake']
        brocoli=request.POST['brocoli']
        apple=request.POST['apple']

        if cheese=="true":
            user.cheese=True
        else:
            user.cheese=False
        if steak=="true":
            user.steak=True
        else:
            user.steak=False
        if fast_food=="true":
            user.fastfood=True
        else:
            user.fastfood=False
        if cupcake=="true":
            user.cupcake=True
        else:
            user.cupcake=False
        if brocoli=="true":
            user.broccoli=True
        else:
            user.broccoli=False
        if apple=="true":
            user.apple=True
        else:
            user.apple=False
        user.save()
        return HttpResponseRedirect(reverse('Home'))


    context = {
        'recipes': Recipe.objects.all(),
        'user': User.objects.get(pk=request.session["userId"])
    }

    return render(request, 'main/user_preferences.html',context)
    
def home(request, userId=-1):
    # Set session user id
    if userId != -1:
        request.session["userId"] = userId

    currentId = request.session["userId"]

    heartedRecipes = Recipe.objects.filter(user__id=currentId).annotate(weighting=
        HEARTED_WEIGHT +
        F('rating')*RATING_WEIGHT +
        (5-F('difficulty')+1)*DIFFICULTY_WEIGHT +
        Count('keywords', output_field=FloatField())*KEYWORD_RATING)

    regulrRecipes = Recipe.objects.exclude(user__id=currentId).annotate(weighting=
        F('rating')*RATING_WEIGHT +
        (5-F('difficulty')+1)*DIFFICULTY_WEIGHT +
        Count('keywords', output_field=FloatField())*KEYWORD_RATING)

    recipes = heartedRecipes | regulrRecipes
    recipes = recipes.order_by('weighting').reverse()
    recipes = recipes.filter(weighting__gt=17)
    #recipes = random.shuffle(recipes)
    #print(recipes.count())
    recipes = recipes.order_by('?')

    context = {
        'recipes': Recipe.objects.all(),
        'suggestions': recipes[:3],
        'user': User.objects.get(pk=request.session["userId"])
    }
    
    return render(request, 'main/home.html',context)

def users(request):
    err = ''
    if request.method == 'POST':
        name = request.POST['name']
        age = request.POST['age']
        cheese=request.POST['cheese']
        steak=request.POST['steak']
        fast_food=request.POST['fast_food']
        cupcake=request.POST['cupcake']
        brocoli=request.POST['brocoli']
        apple=request.POST['apple']

        if cheese=="true":
            cheese=True
        else:
            cheese=False
        if steak=="true":
            steak=True
        else:
            steak=False
        if fast_food=="true":
            fast_food=True
        else:
            fast_food=False
        if cupcake=="true":
            cupcake=True
        else:
            cupcake=False
        if brocoli=="true":
            brocoli=True
        else:
            brocoli=False
        if apple=="true":
            apple=True
        else:
            apple=False

        if User.objects.all().filter(userName=name).count() != 0:
            err = "Sorry User is taken"
        else:
            newUser = User(userName=name, age=age,cheese=cheese, fastfood=fast_food, steak=steak,cupcake=cupcake,broccoli=brocoli, apple=apple)
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
    user = User.objects.get(pk=request.session["userId"])
    #steps = get_object_or_404(RecipeStep,pk=recipe_id)

    oldObjects = History.objects.filter(recipe=recipe, user=user, timeOfEnd__isnull=True)
    if oldObjects.count() > 0:
        hist = oldObjects[0]
        hist.timeOfStart = timezone.now()
        hist.save()
    else:
        hist = History(recipe=recipe, user=user, timeOfStart=timezone.now())
        hist.save()

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
        'utensils': Utensil.objects.exclude(recipe=recipe)

    }
    return render(request, 'main/edit.html', context)

def edit_title(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)
    try:
        new_title=request.POST['title']
    except(KeyError):
        print("there was a key error, no title")
        return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))
    else:
        recipe.title=new_title
        recipe.save()
        return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))

def edit_description(request, recipe_id=0):
    recipe=get_object_or_404(Recipe,pk=recipe_id)
    try:
        new_description=request.POST['description']
    except(KeyError):
        print("there was a key error, no description")
        return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))
    else:
        recipe.description=new_description
        recipe.save()
        return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))

def edit_ingredients(request, recipe_id=0):
        recipe=get_object_or_404(Recipe,pk=recipe_id)
        RtoIs=request.POST.getlist('recipeToIng_IDs')
        ingredients = request.POST.getlist('ingredient')
        quanties = request.POST.getlist('quantity')
        units = request.POST.getlist('unit')

        for i in range(0, len(ingredients)):
            ing = Ingredient.objects.get_or_create(name__iexact = ingredients[i], defaults={'name':ingredients[i]})[0]
            if i >=len(RtoIs):
                print(i, "larger than pks")
                repToIng = RecipeToIngredient(
                    recipe = recipe,
                    ingredient = ing,
                    quantity = quanties[i],
                    unit = units[i]
                )
            else:
               repToIng=get_object_or_404(RecipeToIngredient,pk=RtoIs[i]) 
               repToIng.recipe=recipe
               repToIng.ingredient=ing
               repToIng.unit=units[i]
               repToIng.quantity=quanties[i]

            repToIng.save()
        return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))

def edit_utensils(request, recipe_id=0):
    # Create new utensils
    utensils = request.POST.getlist('utensils')
    recipe=get_object_or_404(Recipe,pk=recipe_id)
    recipe.utensils.clear()
    for i in range(0, len(utensils)):
        uten = Utensil.objects.get_or_create(name__iexact = utensils[i], defaults={'name':utensils[i]})[0]
        recipe.utensils.add(uten)
    recipe.save()
    return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))

def edit_method(request, recipe_id=0):
    recipe = get_object_or_404(Recipe, pk=recipe_id)
    recipe.steps.all().delete()
    steps = request.POST.getlist('step_text')

    for i in range(0, len(steps)):
        step = RecipeStep(
            recipe = recipe,
            stepNumber = i+1,
            text = steps[i]
        )

        step.save()

    return HttpResponseRedirect(reverse('edit', args=(recipe.id,)))


def finish_recipe(request, recipe_id=0):

    recipe=get_object_or_404(Recipe,pk=recipe_id)
    #steps = get_object_or_404(RecipeStep,pk=recipe_id)

    context = {
        'recipe':recipe
        
    }
    return render(request, 'main/finish_recipe.html',context)
