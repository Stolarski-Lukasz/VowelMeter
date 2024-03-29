from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os
from datetime import datetime
from .models import AcousticMeasurements

from .my_parselmouth_analysis import analysis
from .my_matplotlib_drawing import draw_all
from .my_matplotlib_pillow_drawing import draw_all_lowquality

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


@csrf_exempt
def vowel_analysis(request):

    # obtaining measurement data from request object
    key = list(request.FILES.keys())
    uploaded_file = request.FILES[key[0]]
    print(type(uploaded_file))
    print(uploaded_file.name)
    window_length = float(request.POST["window_length"])
    dynamic_range = float(request.POST["dynamic_range"])
    max_number_of_formants = float(request.POST["max_number_of_formants"])
    maximum_formant = float(request.POST["maximum_formant"])
    pitch_floor = float(request.POST["pitch_floor"])
    pitch_ceiling = float(request.POST["pitch_ceiling"])
    image_quality = request.POST["image_quality"]
    colour_scheme = request.POST["colour_scheme"]

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

    # saving measurement data to database
    acoustic_measurements = AcousticMeasurements(
        uploaded_file=uploaded_file.name,
        window_length=window_length,
        dynamic_range=dynamic_range,
        max_number_of_formants=max_number_of_formants,
        maximum_formant=maximum_formant,
        pitch_floor=pitch_floor,
        pitch_ceiling=pitch_ceiling,
        image_quality=image_quality,
        colour_scheme=colour_scheme,
        f3 = results[3],
        f2 = results[2],
        f1 = results[1],
        f0 = results[0]
    )
    acoustic_measurements.save()
    acoustic_measurements_id = acoustic_measurements.id

    # declaring data for drawing
    image_file_name_and_path = BASE_DIR + \
        "/media/" + full_file_name[:-4] + ".jpg"
    image_file_name_and_path_for_frontend = "/media/" + \
        full_file_name[:-4] + ".jpg"
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
                         "spectrogram_name_and_path": image_file_name_and_path_for_frontend,
                         "acoustic_measurements_id": acoustic_measurements_id})
