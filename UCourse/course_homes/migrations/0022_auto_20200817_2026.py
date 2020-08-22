# Generated by Django 3.0.7 on 2020-08-17 13:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0021_remove_topicasset_icon'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='studentassignment',
            name='attachment',
        ),
        migrations.AddField(
            model_name='assignment',
            name='max_score',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='assignment',
            name='max_submit_time',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='studentassignment',
            name='score',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='topicasset',
            name='assignment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='assigment_files', to='course_homes.Assignment'),
        ),
        migrations.AddField(
            model_name='topicasset',
            name='student_assignment',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='student_assigment_files', to='course_homes.StudentAssignment'),
        ),
        migrations.AlterField(
            model_name='topicasset',
            name='learning_topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='topic_assets', to='course_homes.LearningTopic'),
        ),
    ]