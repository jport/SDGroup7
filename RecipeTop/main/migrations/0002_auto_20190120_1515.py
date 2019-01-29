# Generated by Django 2.1.5 on 2019-01-20 20:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='History',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timeOfStart', models.DateTimeField()),
                ('timeOfEnd', models.DateTimeField()),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipeHistory', to='main.Recipe')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userName', models.CharField(max_length=50)),
                ('age', models.IntegerField(default=0)),
                ('likedRecipes', models.ManyToManyField(to='main.Recipe')),
            ],
        ),
        migrations.CreateModel(
            name='Utensil',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AddField(
            model_name='history',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userHistory', to='main.User'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='utensils',
            field=models.ManyToManyField(to='main.Utensil'),
        ),
    ]