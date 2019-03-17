from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def changeHeartStatus(request):
    print("change")
    return JsonResponse({'error': ''})