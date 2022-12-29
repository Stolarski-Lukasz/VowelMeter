from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def home(request):
    return render(request, 'home.html')

def settings(request):
    return render(request, 'settings.html')

def help(request):
    return render(request, 'help.html')

def tutorial(request):
    return render(request, 'tutorial.html')

def contact(request):
    return render(request, 'contact.html')


def experiment(request):
    return JsonResponse({'foo': 'bar'})

def vowelsmap(request):
    return render(request, 'vowelsmap.txt')
