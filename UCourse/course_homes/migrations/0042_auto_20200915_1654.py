# Generated by Django 3.0.7 on 2020-09-15 09:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0041_topicasset_youtube_src'),
    ]

    operations = [
        migrations.AlterField(
            model_name='learningtopic',
            name='slug',
            field=models.SlugField(blank=True, null=True),
        ),
    ]