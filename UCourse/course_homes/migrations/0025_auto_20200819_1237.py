# Generated by Django 3.0.7 on 2020-08-19 05:37

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0024_auto_20200818_2241'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topicasset',
            name='student_assignment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='student_assignment_files', to='course_homes.StudentAssignment'),
        ),
    ]
