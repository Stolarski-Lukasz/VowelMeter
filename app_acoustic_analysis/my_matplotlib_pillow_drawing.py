import numpy as np
import matplotlib.pyplot as plt
import io
import pandas as pd
from PIL import Image, ImageFilter


def draw_spectrogram(spectrogram, colour_scheme, dynamic_range=70):
    X, Y = spectrogram.x_grid(), spectrogram.y_grid()
    sg_db = 10 * np.log10(spectrogram.values)
    plt.pcolormesh(X, Y, sg_db, vmin=sg_db.max() - dynamic_range, cmap=colour_scheme)
    plt.ylim([spectrogram.ymin, spectrogram.ymax])
    plt.xlabel("time [s]")
    plt.ylabel("frequency [Hz]")
    plt.ylim(0, 4000)
    plt.xlabel("time [s]")
    plt.ylabel("frequency [Hz]")


def draw_pitch(pitch):
    pitch_values = pitch.selected_array['frequency']
    pitch_values[pitch_values==0] = np.nan
    plt.plot(pitch.xs(), pitch_values, 'o', markersize=0.8, color='brown')
    plt.grid(False)
    # plt.ylim(0, pitch.ceiling)
    plt.ylim(0, 4000)


def draw_formants(listing_of_formants):
    buffer = io.StringIO(listing_of_formants)
    data = pd.read_table(buffer)
    plt.plot(data["time(s)"], data["F1(Hz)"], 'o', markersize=0.8, color='tab:blue')
    plt.grid(False)
    plt.ylim(0, 4000)
    plt.plot(data["time(s)"], data["F2(Hz)"], 'o', markersize=0.8, color='tab:green')
    plt.grid(False)
    plt.ylim(0, 4000)
    plt.plot(data["time(s)"], data["F3(Hz)"], 'o', markersize=0.8, color="gold")
    plt.grid(False)
    plt.ylim(0, 4000)


def draw_all_lowquality(spectrogram, dynamic_range, listing_of_formants, 
pitch, snd_xmin, snd_xmax, image_file_name_and_path, colour_scheme):
    plt.figure()
    draw_spectrogram(spectrogram, colour_scheme, dynamic_range)  
    plt.twinx()
    draw_pitch(pitch)
    draw_formants(listing_of_formants)
    plt.xlim([snd_xmin, snd_xmax])
    # plt.show()
    plt.savefig(image_file_name_and_path, dpi=200)
    OriImage = Image.open(image_file_name_and_path)
    box = (162, 117, 1150, 853)
    region = OriImage.crop(box)
    region = region.filter(ImageFilter.BoxBlur(0.5))
    OriImage.paste(region, box)
    OriImage.save(image_file_name_and_path)