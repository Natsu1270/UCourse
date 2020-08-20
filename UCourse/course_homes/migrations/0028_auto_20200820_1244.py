# Generated by Django 3.0.7 on 2020-08-20 05:44

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('course_homes', '0027_auto_20200820_1242'),
    ]

    operations = [
        migrations.AlterField(
            model_name='assignment',
            name='views',
            field=models.ManyToManyField(blank=True, related_name='assignment_viewed', to=settings.AUTH_USER_MODEL),
        ),
    ]
