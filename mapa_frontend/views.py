from django.shortcuts import render

# Create your views here.
def observacionesListaMapa(request):
    return render(request, 'mapa_frontend/observaciones_base.html')