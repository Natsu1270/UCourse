# Generated by Django 3.0.7 on 2020-08-30 09:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0031_usercourse_is_summarised'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercourse',
            name='started_date',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
