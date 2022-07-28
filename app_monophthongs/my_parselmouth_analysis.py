import parselmouth
from parselmouth.praat import call


def analysis(sound_file, window_length, time_step, frequency_step, 
maximum_formant, max_number_of_formants, pitch_floor, pitch_ceiling):
    results = []
    sound = parselmouth.Sound(sound_file)
    spectrogram = sound.to_spectrogram(window_length=window_length, time_step=time_step, frequency_step=frequency_step)
    f0 = call(sound, "To Pitch", 0, pitch_floor, pitch_ceiling)
    f0_mean = call(f0, "Get mean", 0, 0, "Hertz")
    formants = call(sound, "To Formant (burg)", 0, max_number_of_formants, maximum_formant, 0.025, 50)
    f1_mean = call(formants, "Get mean", 1, 0, 0, "hertz")
    f2_mean = call(formants, "Get mean", 2, 0, 0, "hertz")
    f3_mean = call(formants, "Get mean", 3, 0, 0, "hertz")
    listing_of_formants = call(formants, "List", "no", "yes", 6, "no", 3, "no", 3, "no")
    min_xvalue = sound.xmin
    max_xvalue = sound.xmax
    results = [f0_mean, f1_mean, f2_mean, f3_mean, spectrogram, f0, listing_of_formants, min_xvalue, max_xvalue]
    return results