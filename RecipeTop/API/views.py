from django.shortcuts import render
from django.http import JsonResponse
from main.models import *
import json

# Create your views here.
def changeHeartStatus(request):
    error = ""
    data = json.loads(request.body)

    if not "RecipeID" in data:
        error = "Missing RecipeID;"
    if not "Status" in data:
        error += "Missing Status;"

    if error:
        return JsonResponse({'error': error})

    recipeId = data["RecipeID"]
    userId = request.session["userId"]
    newStatus = data["Status"]
    
    recipe = Recipe.objects.filter(id=recipeId)[0]
    user = User.objects.filter(id=userId)[0]

    if newStatus == 0: # Delete favorite
        recipe.user_set.remove(user)
    else: # Add favorite
        recipe.user_set.add(user)
    
    return JsonResponse({'error': error})