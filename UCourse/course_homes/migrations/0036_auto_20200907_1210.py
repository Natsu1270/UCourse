# Generated by Django 3.0.7 on 2020-09-07 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0035_merge_20200906_1049'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='pass_score',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='is_pass',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]