# cython: profile=True
import numpy as np
import matplotlib.pyplot as plt
import io
import pandas as pd


cdef list add_intermediate_values_horizontally(list values_list, int values_list_len, int intermediate_values_number):
    cdef list all_intermediate_values = []
    cdef double difference
    cdef double difference_abs
    cdef double step_value
    cdef list intermediate_values
    cdef double item_analysed
    cdef double next_item
    cdef int iteration_number
    cdef double intermediate
    cdef int valve = values_list_len-1
    cdef int i
    for i in range(values_list_len):
        if i < valve:
            difference = values_list[i] - values_list[i + 1]
            difference_abs = abs(difference)
            step_value = difference_abs / (intermediate_values_number + 1)
            intermediate_values = []
            item_analysed = values_list[i]
            next_item = values_list[i + 1]
            iteration_number = intermediate_values_number
            while iteration_number >= 1:
                if item_analysed > next_item:
                    intermediate = item_analysed - (step_value * iteration_number)
                    intermediate_values.append(intermediate)
                elif item_analysed < next_item:
                    intermediate = item_analysed + (step_value * iteration_number)
                    intermediate_values.append(intermediate)
                else:
                    intermediate = item_analysed + (step_value * iteration_number)
                    intermediate_values.append(intermediate)
                iteration_number -= 1
            intermediate_values = intermediate_values[::-1]
            all_intermediate_values.append(intermediate_values)
        else:
            break
    cdef int first_counter = 1
    cdef int second_counter = 0
    cdef int intermediate_values_length = len(all_intermediate_values[0]) + 1
    cdef int j
    for j in range(values_list_len):
        if first_counter < len(values_list):
            values_list[first_counter:first_counter] = all_intermediate_values[second_counter]
            first_counter = first_counter + intermediate_values_length
            second_counter += 1
    return values_list


cdef list add_intermediate_values_vertically(list values_list1, list values_list2, int resolution_increase):
    cdef list conglomerate = []
    cdef int conglomerate_counter = resolution_increase
    while conglomerate_counter > 0:
        conglomerate.append([])
        conglomerate_counter -= 1
    cdef int intermediate_values_counter = 0
    cdef int values_list1_len = len(values_list1)
    cdef int k
    cdef list values_to_process
    cdef list values_list
    cdef list intermediate_values_list
    cdef int l
    cdef int intermediate_values_list_len
    for k in range(values_list1_len):
        values_to_process = [values_list1[k], values_list2[k]]
        values_list = add_intermediate_values_horizontally(values_to_process, 2, resolution_increase)
        intermediate_values_list = values_list[1:resolution_increase+1]
        intermediate_values_list_len = len(intermediate_values_list)
        for l in range(intermediate_values_list_len):
            conglomerate[l].append(intermediate_values_list[l])
    return conglomerate



def get_expanded_resolution_values(spectrogram, int resolution_increase=1):
    # expanding coordinates
    x_coordinates, y_coordinates = spectrogram.x_grid(), spectrogram.y_grid()
    x_coordinates = x_coordinates.tolist()
    x_coordinates_len = len(x_coordinates)
    x_coordinates = add_intermediate_values_horizontally(x_coordinates, x_coordinates_len, resolution_increase)
    x_coordinates = x_coordinates[:-resolution_increase]
    y_coordinates = y_coordinates.tolist()
    y_coordinates_len = len(y_coordinates)
    y_coordinates = add_intermediate_values_horizontally(y_coordinates, y_coordinates_len, resolution_increase)

    # obtaining values
    sg_db = 10 * np.log10(spectrogram.values)
    cdef list values_listoflists = []
    cdef int sg_db_len = len(sg_db)
    cdef int m
    for m in range(sg_db_len):
        segment = sg_db[m].tolist()
        values_listoflists.append(segment)

    # expanding values horizontally
    cdef list values_listoflists_expanded_horizontally = []
    cdef int values_listoflists_len = len(values_listoflists)
    cdef int length
    cdef int n
    for n in range(values_listoflists_len):
        length = len(values_listoflists[n])
        segment = add_intermediate_values_horizontally(values_listoflists[n], length, resolution_increase)
        values_listoflists_expanded_horizontally.append(segment)

    # expanding values vertically
    # here changing into praat style did not help
    cdef list values_listoflists_expanded_horizontally_and_vertically = []
    cdef int segments_counter = 1
    cdef int values_listoflists_expanded_horizontally_len = len(values_listoflists_expanded_horizontally)
    for segment in values_listoflists_expanded_horizontally:
        if segments_counter < values_listoflists_expanded_horizontally_len:
            values_listoflists_expanded_horizontally_and_vertically.append(segment)
            new_segments = add_intermediate_values_vertically(segment, values_listoflists_expanded_horizontally[segments_counter], resolution_increase)
            for new_segment in new_segments:
                values_listoflists_expanded_horizontally_and_vertically.append(new_segment)
            segments_counter += 1
        else:
            break
    cdef int correction_counter = resolution_increase + 1
    while correction_counter > 0:
        values_listoflists_expanded_horizontally_and_vertically.append(values_listoflists_expanded_horizontally[-1])
        correction_counter -= 1
    return [x_coordinates, y_coordinates, values_listoflists_expanded_horizontally_and_vertically, sg_db.max()]


def draw_spectrogram(spectrogram, colour_scheme, int resolution_increase, int dynamic_range=70):
    cdef list expanded_resolution_values
    expanded_resolution_values = get_expanded_resolution_values(spectrogram, resolution_increase)
    plt.pcolormesh(expanded_resolution_values[0], expanded_resolution_values[1], expanded_resolution_values[2], vmin=expanded_resolution_values[3] - dynamic_range, cmap=colour_scheme)
    # plt.ylim([spectrogram.ymin, spectrogram.ymax])
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


def draw_all(spectrogram, resolution_increase, dynamic_range, listing_of_formants, 
pitch, snd_xmin, snd_xmax, image_file_name_and_path, colour_scheme):
    plt.figure()
    draw_spectrogram(spectrogram, colour_scheme, resolution_increase, dynamic_range)
    plt.twinx()
    draw_pitch(pitch)
    draw_formants(listing_of_formants)
    plt.xlim([snd_xmin, snd_xmax])
    # plt.show()
    plt.savefig(image_file_name_and_path, dpi=200)




