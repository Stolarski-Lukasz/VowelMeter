import parselmouth
from parselmouth.praat import call
import math


def harmonics(sound_file):
    sound = parselmouth.Sound(sound_file)
    f0 = call(sound, "To Pitch", 0, 75, 600)
    f0_mean = call(f0, "Get mean", 0, 0, "Hertz")
    formants = call(sound, "To Formant (burg)", 0, 5, 5500, 0.025, 50)
    f1_mean = call(formants, "Get mean", 1, 0, 0, "hertz")
    f2_mean = call(formants, "Get mean", 2, 0, 0, "hertz")
    f3_mean = call(formants, "Get mean", 3, 0, 0, "hertz")
    f4_mean = call(formants, "Get mean", 4, 0, 0, "hertz")
    results = [f0_mean, f1_mean, f2_mean, f3_mean, f4_mean]
    return results


def vq_coordinates(sound_file):
    sound = parselmouth.Sound(sound_file)
    f0 = call(sound, "To Pitch", 0, 75, 600)
    f0_mean = call(f0, "Get mean", 0, 0, "Hertz")
    formants = call(sound, "To Formant (burg)", 0, 5, 5500, 0.025, 50)
    f1_mean = call(formants, "Get mean", 1, 0, 0, "hertz")
    f2_mean = call(formants, "Get mean", 2, 0, 0, "hertz")
    backness = (1.782 * math.log(f1_mean)) - (8.617 * math.log(f2_mean)) + 58.29
    height = (3.122 * math.log(f0_mean)) - (8.841 * math.log(f1_mean)) + 44.16
    coordinates = [backness, height]
    return coordinates


# the coordinates set for adult male
def harmonics_and_vq_coordinates(sound_file):
    sound = parselmouth.Sound(sound_file)
    f0 = call(sound, "To Pitch", 0, 75, 300)
    f0_mean = call(f0, "Get mean", 0, 0, "Hertz")
    formants = call(sound, "To Formant (burg)", 0, 5, 5000, 0.025, 50)
    f1_mean = call(formants, "Get mean", 1, 0, 0, "hertz")
    f2_mean = call(formants, "Get mean", 2, 0, 0, "hertz")
    # line below - praat testing - remove later
    f3_mean = call(formants, "Get mean", 3, 0, 0, "hertz")
    backness = (1.782 * math.log(f1_mean)) - (8.617 * math.log(f2_mean)) + 58.29
    height = (3.122 * math.log(f0_mean)) - (8.841 * math.log(f1_mean)) + 44.16
    results = []
    results.append(f0_mean)
    results.append(f1_mean)
    results.append(f2_mean)
    results.append(backness)
    results.append(height)
    # line below - praat testing - remove later
    results.append(f3_mean)
    return results


