from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/index.html')

def home(request):
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/home.html')

def search(request):
    #return HttpResponse("Hello, world. You're at main's index.")
    return render(request, 'main/search.html')