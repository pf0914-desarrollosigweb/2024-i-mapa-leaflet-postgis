from .models import Observacion, RegistroPresencia
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

class RegistroPresenciaSerializador(GeoFeatureModelSerializer):
    class Meta:
        model = RegistroPresencia
        geo_field = 'geom'

        fields = (
            'id',
            'species',
            'sex',
            'age',
            'decimallongitude',
            'decimallatitude'
        )        