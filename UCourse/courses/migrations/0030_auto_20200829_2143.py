# Generated by Django 3.0.7 on 2020-08-29 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0029_usercourse_received_certificate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercourse',
            name='rank',
            field=models.CharField(blank=True, choices=[('medium', 'Medium'), ('good', 'Good'), ('xgood', 'Very good'), ('bad', 'Bad')], max_length=20, null=True),
        ),
    ]