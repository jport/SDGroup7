# Generated by Django 2.1.4 on 2019-03-26 01:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_user_cheese'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='apple',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='broccoli',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='cupcake',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='fastfood',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='steak',
            field=models.BooleanField(default=False),
        ),
    ]
