from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import RegistroPresencia

registropresencia_mapping = {
    'species': 'species',
    'sex': 'sex',
    'age': 'age',
    'decimallongitude': 'decimalLongitude',
    'decimallatitude': 'decimalLatitude',
    'geom': 'POINT',
}

registros_gpkg = Path(__file__).resolve().parent / 'datos' / 'registros-presencia.gpkg'

def run(verbose=True):
    lm = LayerMapping(RegistroPresencia, registros_gpkg, registropresencia_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)