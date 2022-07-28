from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from datetime import datetime
from keras.models import load_model
import pandas as pd

from .my_parselmouth_analysis import analysis
from .my_matplotlib_drawing import draw_all
from .my_matplotlib_pillow_drawing import draw_all_lowquality
from .my_millers_model import millers_coordinates

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

backness_model = load_model(BASE_DIR + "/static/models/" + "backness_1177.model")
height_model = load_model(BASE_DIR + "/static/models/" + "height_0920.model")


@csrf_exempt
def home(request):
    return render(request, 'home.html')


@csrf_exempt
def vowel_analysis(request):
    
    # obtaining data from request object
    key = list(request.FILES.keys())
    uploaded_file = request.FILES[key[0]]
    window_length = float(request.POST["window_length"])
    dynamic_range = float(request.POST["dynamic_range"])
    max_number_of_formants = float(request.POST["max_number_of_formants"])
    maximum_formant = float(request.POST["maximum_formant"])
    pitch_floor = float(request.POST["pitch_floor"])
    pitch_ceiling = float(request.POST["pitch_ceiling"])
    image_quality = request.POST["image_quality"]
    colour_scheme = request.POST["colour_scheme"]
    print(colour_scheme)

    # acoustic analysis - performed in Praat via Parselmouth (in parselmouth_analysis.py)
    fs = FileSystemStorage()
    time_stamp = datetime.now().strftime('%Y_%m_%d %H_%M_%S_%f')
    time_stamp = time_stamp.replace(' ', '_')
    full_file_name = time_stamp + "_" + uploaded_file.name
    fs.save(full_file_name, uploaded_file)
    full_file_name_and_path = BASE_DIR + "/media/" + full_file_name
    results = analysis(sound_file=full_file_name_and_path, window_length=window_length, 
    time_step=0.0001, frequency_step=1, maximum_formant=maximum_formant, max_number_of_formants=max_number_of_formants, 
    pitch_floor=pitch_floor, pitch_ceiling=pitch_ceiling)

    # declaring data for drawing
    image_file_name_and_path = BASE_DIR + "/media/" + full_file_name[:-4] + ".jpg"
    image_file_name_and_path_for_frontend = "/media/" + full_file_name[:-4] + ".jpg"
    spectrogram = results[4]
    pitch = results[5]
    listing_of_formants = results[6]
    min_xvalue = results[7]
    max_xvalue = results[8]

    # drawing
    if image_quality == "standard":
        # creation of spectrogram - performed in Matplotlib (in my_matplotlib_drawing.pyx)
        draw_all(spectrogram=spectrogram, resolution_increase=1, dynamic_range=dynamic_range, 
        listing_of_formants=listing_of_formants, pitch=pitch, snd_xmin=min_xvalue, snd_xmax=max_xvalue,
        image_file_name_and_path=image_file_name_and_path, colour_scheme=colour_scheme)
    elif image_quality == "low":
        # creation of spectrogram - performed in Matplotlib and Pillow (in my_matplotlib_pillow_drawing.py)
        draw_all_lowquality(spectrogram=spectrogram, dynamic_range=dynamic_range, 
        listing_of_formants=listing_of_formants, pitch=pitch, snd_xmin=min_xvalue, snd_xmax=max_xvalue,
        image_file_name_and_path=image_file_name_and_path, colour_scheme=colour_scheme)
    # for now I removed "high", because the qulity increase is miniscule - to enable it again, remove "hidden" for "high_quality" radio button in html
    # elif image_quality == "high":
    #     # creation of spectrogram - performed in Matplotlib (in my_matplotlib_drawing.pyx)
    #     draw_all(spectrogram=spectrogram, resolution_increase=2, dynamic_range=dynamic_range, 
    #     listing_of_formants=listing_of_formants, pitch=pitch, snd_xmin=min_xvalue, snd_xmax=max_xvalue,
    #     image_file_name_and_path=image_file_name_and_path)

    return JsonResponse({"f0_mean": round(results[0]), 
                         "f1_mean": round(results[1]),
                         "f2_mean": round(results[2]),
                         "f3_mean": round(results[3]),
                         "spectrogram_name_and_path": image_file_name_and_path_for_frontend})

@csrf_exempt
def get_vq_coordinates(request):
    f0_final = float(request.POST["f0_final"])
    f1_final = float(request.POST["f1_final"])
    f2_final = float(request.POST["f2_final"])
    f3_final = float(request.POST["f3_final"])
    coordinates = millers_coordinates(f0_final, f1_final, f2_final, f3_final)
    data = pd.DataFrame({'log_f1_sr': coordinates[0],
                        'log_f2_f1': coordinates[1],
                        'log_f3_f2': coordinates[2]},
                        index=[0])
    backness = backness_model.predict(data[['log_f1_sr', 'log_f2_f1', 'log_f3_f2']])
    backness = str(backness[0][0])
    height = height_model.predict(data[['log_f1_sr', 'log_f2_f1', 'log_f3_f2']])
    height = str(height[0][0])
    return JsonResponse({"log_f1_sr": coordinates[0],
                         "log_f2_f1": coordinates[1],
                         "log_f3_f2": coordinates[2],
                         "backness": backness,
                         "height": height})


def settings(request):
    return render(request, 'settings.html')

def help(request):
    return render(request, 'help.html')

def tutorial(request):
    return render(request, 'tutorial.html')

def contact(request):
    return render(request, 'contact.html')


def experiment(request):
    return JsonResponse({'foo': 'bar'})

def vowelsmap(request):
    return render(request, 'vowelsmap.txt')
