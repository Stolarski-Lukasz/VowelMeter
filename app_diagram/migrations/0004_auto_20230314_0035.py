# Generated by Django 3.0 on 2023-03-14 00:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_acoustic_analysis', '0001_initial'),
        ('app_diagram', '0003_auto_20230314_0034'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diagramcoordinates',
            name='acoustic_measurements',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='app_acoustic_analysis.AcousticMeasurements'),
        ),
    ]
