from django.db import models
units = ["cup(s)", "kg", "grams", "lbs", "ounces", "ml", "units", "tbsp", "tsp", "handfuls"];
# Create your models here.

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    estDuration = models.IntegerField(default=0)
    avgDuration = models.IntegerField(default=0)
    difficulty = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)

    ingredients = models.ManyToManyField('Ingredient', through='RecipeToIngredient', through_fields=('recipe', 'ingredient'))
    utensils = models.ManyToManyField('Utensil')
    keywords = models.ManyToManyField('Keyword', blank=True)

    image = models.ImageField(upload_to='recipe_image', blank=True, default='/recipe_image/default.jpeg')

    def __str__(self):
        return self.title 



class Ingredient(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class RecipeToIngredient(models.Model):
    recipe = models.ForeignKey('Recipe', on_delete=models.CASCADE)
    ingredient = models.ForeignKey('Ingredient', on_delete=models.CASCADE)
    quantity = models.FloatField()
    unit = models.IntegerField(default=0)

    def __str__(self):
        return str(self.recipe) + " " + str(self.ingredient) + " " + str(self.quantity) + " " + str(self.unit)
    def get_unit(self):

        return units[self.unit-1]

class Utensil(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Keyword(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class RecipeStep(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='steps')
    stepNumber = models.IntegerField(default=0)
    text = models.CharField(max_length=2000)
    weighAction = models.BooleanField(default=False)
    weighValue = models.IntegerField(default=0)
    timeAction = models.BooleanField(default=False)
    timeValue = models.IntegerField(default=0)
    preheatAction = models.BooleanField(default=False)
    preheatValue = models.IntegerField(default=0)

    def __str__(self):
        return str(self.stepNumber) + " " + str(self.recipe)

class User(models.Model):
    userName = models.CharField(max_length=50)
    age = models.IntegerField(default=0)
    likedRecipes = models.ManyToManyField(Recipe)


    def __str__(self):
        return self.userName + " " + str(self.age) + " " + str(self.likedRecipes)





class History(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, related_name='recipeHistory')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='userHistory')
    timeOfStart = models.DateTimeField()
    timeOfEnd = models.DateTimeField()



# examples:
# get all recipes Recipe.objects.all()
# get top 10 recipes Recipe.objects.all()[:10]
# get steps related to a recipe
# r = Recipe.objects.all()[0]
# r.steps.all()