# Generated by Django 3.0.3 on 2020-08-12 14:53

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0006_auto_20200812_2153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exam',
            name='start_date',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
