# Generated by Django 3.0.7 on 2020-09-06 03:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course_homes', '0033_coursehome_exam_percentage'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='assignment',
            table='Assignment',
        ),
        migrations.AlterModelTable(
            name='coursehome',
            table='CourseHome',
        ),
        migrations.AlterModelTable(
            name='learningtopic',
            table='LearningTopic',
        ),
        migrations.AlterModelTable(
            name='studentassignment',
            table='StudentAssignment',
        ),
        migrations.AlterModelTable(
            name='studentcoursehome',
            table='StudentCourseHome',
        ),
        migrations.AlterModelTable(
            name='studentnote',
            table='StudentNote',
        ),
        migrations.AlterModelTable(
            name='topicasset',
            table='TopicAsset',
        ),
    ]