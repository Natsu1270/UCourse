# Generated by Django 3.0.7 on 2020-08-21 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0011_studentexamresult'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentexamresult',
            name='last_update',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]