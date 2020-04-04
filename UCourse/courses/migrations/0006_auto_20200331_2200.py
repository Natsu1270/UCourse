# Generated by Django 3.0.3 on 2020-03-31 15:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0005_course_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursedetail',
            name='course',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='course_detail', to='courses.Course'),
        ),
    ]