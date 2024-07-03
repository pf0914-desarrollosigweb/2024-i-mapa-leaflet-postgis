from .models import Observacion, RegistroPresencia
from .serializers import ObservacionSerializador, RegistroPresenciaSerializador
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

class RegistroPresenciaLista(generics.ListAPIView):
    queryset = RegistroPresencia.objects.all()
    serializer_class = RegistroPresenciaSerializador
    name = 'registropresencia-lista'