# Generated by Django 3.0.7 on 2020-08-08 04:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('forums', '0003_auto_20200515_2350'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='thread',
            options={'ordering': ['-id']},
        ),
    ]
