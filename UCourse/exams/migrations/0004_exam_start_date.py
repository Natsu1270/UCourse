# Generated by Django 3.0.3 on 2020-08-12 00:14

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0003_auto_20200802_1319'),
    ]

    operations = [
        migrations.AddField(
            model_name='exam',
            name='start_date',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2020, 8, 12, 0, 14, 41, 774922, tzinfo=utc), null=True),
        ),
    ]
