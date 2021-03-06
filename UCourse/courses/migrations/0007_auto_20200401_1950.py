# Generated by Django 3.0.3 on 2020-04-01 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0001_initial'),
        ('courses', '0006_auto_20200331_2200'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='teacher',
            field=models.ManyToManyField(blank=True, limit_choices_to={'is_teacher': True}, related_name='teacher_course', to='profiles.Profile'),
        ),
    ]
