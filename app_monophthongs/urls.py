from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('vowel_analysis/', views.vowel_analysis, name='vowel_analysis'),
    path('get_vq_coordinates/', views.get_vq_coordinates, name='get_vq_coordinates'),
    path('settings/', views.settings, name='settings'),
    path('help/', views.help, name='help'),
    path('tutorial/', views.tutorial, name='tutorial'),
    path('contact/', views.contact, name='contact'),
    path('experiment/', views.experiment, name='experiment'),
    path('vowelsmap/', views.vowelsmap, name='vowelsmap')
]
