from django.urls import path
from . import views

urlpatterns = [
    path('get_vq_coordinates/', views.get_vq_coordinates, name='get_vq_coordinates')
]