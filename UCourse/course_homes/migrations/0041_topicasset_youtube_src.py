# Generated by Django 3.0.7 on 2020-09-13 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0040_auto_20200913_1640'),
    ]

    operations = [
        migrations.AddField(
            model_name='topicasset',
            name='youtube_src',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
