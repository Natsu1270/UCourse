# Generated by Django 3.0.3 on 2020-04-06 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0013_coursedetail_pre_requisites'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursedetail',
            name='end_date',
        ),
        migrations.RemoveField(
            model_name='coursedetail',
            name='open_date',
        ),
        migrations.AddField(
            model_name='course',
            name='end_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='course',
            name='open_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
