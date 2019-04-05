from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone
from main.models import *
import json, sys

# Create your views here.
def changeHeartStatus(request):
    error = ""
    tempData = request.body
    if sys.version_info[1] < 6:
        tempData = tempData.decode('utf-8')

    data = json.loads(tempData)

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

def finishRecipe(request):
    error = ""
    tempData = request.body
    if sys.version_info[1] < 6:
        tempData = tempData.decode('utf-8')

    data = json.loads(tempData)

    if not "RecipeID" in data:
        error = "Missing RecipeID;"
    if not "Rating" in data:
        error += "Missing Status;"
    if not "Diff" in data:
        error += "Missing difficulty;"

    if error:
        return JsonResponse({'error': error})

    recipeId = data["RecipeID"]
    rating = data["Rating"]
    diff = data["Diff"]

    recipe = Recipe.objects.filter(id=recipeId)[0]
    userId = request.session["userId"]

    previousCount = History.objects.filter(recipe__id=recipeId).count()
    currentCount = previousCount+1

    newRating = (recipe.rating*previousCount + rating)/currentCount
    newDiff = (recipe.difficulty*previousCount + diff)/currentCount

    recipeEvent = History.objects.filter(recipe__id=recipeId, user__id=userId, timeOfEnd__isnull=True)
    if recipeEvent.count() < 1:
        error = "Event not found"
    else:
        recipeEvent = recipeEvent[0]
        timeOfEnd = timezone.now()
        recipeEvent.timeOfEnd = timeOfEnd
        duration = ((timeOfEnd - recipeEvent.timeOfStart).total_seconds())/60
        newAvgDur = (recipe.avgDuration*(previousCount-1) + duration)/previousCount

        recipe.avgDuration = newAvgDur
        recipe.rating = newRating
        recipe.difficulty = newDiff

        recipe.save()
        recipeEvent.save()

    return JsonResponse({'error': error})