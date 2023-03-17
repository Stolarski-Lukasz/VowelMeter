from django.db import models
from app_acoustic_analysis.models import AcousticMeasurements


class DiagramCoordinates(models.Model):
    acoustic_measurements = models.ForeignKey(AcousticMeasurements, on_delete=models.CASCADE, null=True, blank=True)
    f3 = models.IntegerField(null=True, blank=True)
    f2 = models.IntegerField(null=True, blank=True)
    f1 = models.IntegerField(null=True, blank=True)
    f0 = models.IntegerField(null=True, blank=True)
    backness = models.FloatField()
    height = models.FloatField()
    date = models.DateTimeField(auto_now_add=True)