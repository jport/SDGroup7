from django import template


register = template.Library()

@register.simple_tag(takes_context=True)
def check_hearted(context, recipe_id):
	user = context['user']
	hearted_recipes = user.likedRecipes.all()
	if hearted_recipes.filter(pk=recipe_id).exists():
		return "favorite"
	else:
		return "favorite_border"