from .models import Observacion
from .serializers import ObservacionSerializador
from rest_framework import generics

# Create your views here.
class ObservacionLista(generics.ListAPIView):
    queryset = Observacion.objects.all()
    serializer_class = ObservacionSerializador
    name = 'observacion-lista'

class ObservacionDetalle(generics.RetrieveAPIView):
    queryset = Observacion.objects.all()
    serializer_class = ObservacionSerializador
    name = 'observacion-detalle' 