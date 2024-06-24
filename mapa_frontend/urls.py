from django.urls import path
from . import views

app_name = 'mapa_frontend'
urlpatterns = [
    path('', views.observacionesListaMapa, name='observaciones-lista-mapa')
]