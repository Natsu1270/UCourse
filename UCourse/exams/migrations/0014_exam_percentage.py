# Generated by Django 3.0.7 on 2020-08-22 04:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0013_studentexamresult_course_home'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='percentage',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
