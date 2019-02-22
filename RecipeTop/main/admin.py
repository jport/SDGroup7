from django.contrib import admin
from .models import Recipe, Ingredient, RecipeStep, RecipeToIngredient, User, Utensil, History, Keyword

# Register your models here.
admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(RecipeStep)
admin.site.register(RecipeToIngredient)
admin.site.register(User)
admin.site.register(Utensil)
admin.site.register(History)
admin.site.register(Keyword)