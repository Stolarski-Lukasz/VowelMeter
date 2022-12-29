from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('settings/', views.settings, name='settings'),
    path('help/', views.help, name='help'),
    path('tutorial/', views.tutorial, name='tutorial'),
    path('contact/', views.contact, name='contact'),
    path('experiment/', views.experiment, name='experiment'),
    path('vowelsmap/', views.vowelsmap, name='vowelsmap')
]
