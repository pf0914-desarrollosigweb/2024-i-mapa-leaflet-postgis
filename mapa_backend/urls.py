from django.urls import path
from . import views

urlpatterns = [
    path("observaciones/", views.ObservacionLista.as_view(), name=views.ObservacionLista.name),
    path("observaciones/<int:pk>/", views.ObservacionDetalle.as_view(), name=views.ObservacionDetalle.name)
]