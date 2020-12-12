# Generated by Django 3.0.7 on 2020-09-13 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0039_remove_coursehome_expected_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topicasset',
            name='file_type',
            field=models.CharField(blank=True, choices=[('video', 'Video'), ('doc', 'Document'), ('pdf', 'PDF'), ('youtube', 'Youtube Embed'), ('other', 'Other')], max_length=10, null=True),
        ),
    ]