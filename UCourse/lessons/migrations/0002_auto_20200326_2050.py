# Generated by Django 3.0.3 on 2020-03-26 13:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course_homes', '0002_coursehome_course'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lessons', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='created_by',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='lesson',
            name='timeline',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='course_homes.Timeline'),
        ),
    ]