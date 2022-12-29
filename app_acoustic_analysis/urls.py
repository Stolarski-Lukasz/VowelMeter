from django.urls import path
from . import views

urlpatterns = [
    path('vowel_analysis/', views.vowel_analysis, name='vowel_analysis')
]
