# Generated by Django 3.0.7 on 2020-09-06 02:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0006_remove_tag_code'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='tag',
            table='Tag',
        ),
    ]
