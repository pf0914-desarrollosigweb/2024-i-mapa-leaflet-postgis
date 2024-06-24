from .models import Observacion
from rest_framework_gis.serializers import GeoFeatureModelSerializer


class ObservacionSerializador(GeoFeatureModelSerializer):
    class Meta:
        model = Observacion
        geo_field = 'ubicacion'

        fields = (
            'pk',
            'nombre',
            'descripcion'
        )