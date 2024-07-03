from django.db import models
from django.contrib.gis.db import models

class Observacion(models.Model):
    nombre = models.CharField("Nombre de la observación", max_length=50, help_text="Nombre de la observación")
    descripcion = models.CharField("Descripción de la observación", max_length=254, blank=True, help_text="Descripción de la observación")
    ubicacion = models.PointField()

    class Meta:
        verbose_name_plural = "Observaciones"

    def __str__(self):
        return self.nombre
    
class RegistroPresencia(models.Model):
    species = models.CharField(max_length=50, null=True)
    sex = models.CharField(max_length=50, null=True)
    age = models.IntegerField(null=True)
    decimallongitude = models.FloatField(null=True)
    decimallatitude = models.FloatField(null=True)
    geom = models.PointField()

    def __str__(self): return self.species