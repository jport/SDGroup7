# Generated by Django 2.1.5 on 2019-03-23 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_auto_20190306_1905'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, default='/recipe/media/recipe_image/default.jpeg', upload_to='recipe_image'),
        ),
    ]