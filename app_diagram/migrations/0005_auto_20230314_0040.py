# Generated by Django 3.0 on 2023-03-14 00:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_acoustic_analysis', '0001_initial'),
        ('app_diagram', '0004_auto_20230314_0035'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diagramcoordinates',
            name='acoustic_measurements',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='app_acoustic_analysis.AcousticMeasurements'),
        ),
    ]