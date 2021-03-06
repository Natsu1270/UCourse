# Generated by Django 3.0.7 on 2020-08-16 05:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_social_uid'),
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='user_event', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('first_name', models.CharField(blank=True, max_length=50)),
                ('last_name', models.CharField(blank=True, max_length=50)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='event/avatar')),
                ('phone_number', models.CharField(blank=True, max_length=20)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other'), ('N', 'Rather not say')], max_length=1)),
                ('bio', models.TextField(blank=True, null=True)),
                ('address', models.CharField(blank=True, max_length=255)),
                ('is_teacher', models.BooleanField(default=False)),
                ('is_student', models.BooleanField(default=False)),
                ('university', models.CharField(blank=True, max_length=255)),
                ('major', models.CharField(blank=True, max_length=255)),
                ('occupation', models.CharField(blank=True, max_length=50)),
                ('public_info', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now, null=True)),
                ('modified_date', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
