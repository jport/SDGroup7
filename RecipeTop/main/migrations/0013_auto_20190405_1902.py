# Generated by Django 2.1.4 on 2019-04-05 19:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_auto_20190326_0158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='avgDuration',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='difficulty',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='rating',
            field=models.FloatField(default=0),
        ),
    ]