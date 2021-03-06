# Generated by Django 3.0.7 on 2020-08-21 15:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('exams', '0010_exam_enable_review'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentExamResult',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('final_result', models.FloatField(blank=True, null=True)),
                ('exam', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='student_exams_result', to='exams.Exam')),
                ('student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='exam_students_result', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
