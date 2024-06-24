from django.contrib.gis import admin
from .models import Observacion


# Register your models here.
class CustomGeoAdmin(admin.GISModelAdmin):
    gis_widget_kwargs = {
        'attrs': {
            'default_zoom': 7,
            'default_lon': -84.0,
            'default_lat': 10.0
        }
    }

@admin.register(Observacion)
class ObservacionAdmin(CustomGeoAdmin):
    pass