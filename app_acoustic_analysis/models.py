from django.db import models


class AcousticMeasurements(models.Model):
    uploaded_file = models.CharField(max_length=500)
    window_length = models.FloatField()
    dynamic_range = models.IntegerField()
    max_number_of_formants = models.IntegerField()
    maximum_formant  = models.IntegerField()
    pitch_floor  = models.IntegerField()
    pitch_ceiling  = models.IntegerField()
    image_quality = models.CharField(max_length=10)
    colour_scheme = models.CharField(max_length=15)
    f3 = models.IntegerField()
    f2 = models.IntegerField()
    f1 = models.IntegerField()
    f0 = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.uploaded_file