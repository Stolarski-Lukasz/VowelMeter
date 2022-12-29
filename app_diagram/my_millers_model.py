import math

def millers_coordinates(f0_mean, f1_mean, f2_mean, f3_mean):
    sr = (f0_mean / 168) ** (1 / 3) * 168
    log_f1_sr = math.log10(f1_mean / sr)
    log_f2_f1 = math.log10(f2_mean / f1_mean)
    log_f3_f2 = math.log10(f3_mean / f2_mean)
    results = [log_f1_sr, log_f2_f1, log_f3_f2]
    return results