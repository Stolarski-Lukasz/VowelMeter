from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from keras.models import load_model
import pandas as pd
from .models import DiagramCoordinates
from app_acoustic_analysis.models import AcousticMeasurements

from .my_millers_model import millers_coordinates

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

backness_model = load_model(
    BASE_DIR + "/static/models/" + "backness_1177.model")
height_model = load_model(BASE_DIR + "/static/models/" + "height_0920.model")


@csrf_exempt
def get_vq_coordinates(request):
    f0_final = float(request.POST["f0_final"])
    f1_final = float(request.POST["f1_final"])
    f2_final = float(request.POST["f2_final"])
    f3_final = float(request.POST["f3_final"])
    acoustic_measurements_id = request.POST["acoustic_measurements_id"]

    coordinates = millers_coordinates(f0_final, f1_final, f2_final, f3_final)
    data = pd.DataFrame({'log_f1_sr': coordinates[0],
                         'log_f2_f1': coordinates[1],
                         'log_f3_f2': coordinates[2]},
                        index=[0])
    backness = backness_model.predict(
        data[['log_f1_sr', 'log_f2_f1', 'log_f3_f2']])
    backness = str(backness[0][0])
    height = height_model.predict(
        data[['log_f1_sr', 'log_f2_f1', 'log_f3_f2']])
    height = str(height[0][0])

    # saving coordinates to database
    if acoustic_measurements_id != "None":
        diagram_coordinates = DiagramCoordinates(
            acoustic_measurements=AcousticMeasurements.objects.get(
                id=acoustic_measurements_id),
            backness=backness,
            height=height
        )
        diagram_coordinates.save()
    else:
        diagram_coordinates = DiagramCoordinates(
            f3=f3_final,
            f2=f2_final,
            f1=f1_final,
            f0=f0_final,
            backness=backness,
            height=height
        )
        diagram_coordinates.save()

    return JsonResponse({"log_f1_sr": coordinates[0],
                         "log_f2_f1": coordinates[1],
                         "log_f3_f2": coordinates[2],
                         "backness": backness,
                         "height": height})
