# Generated by Django 3.0.3 on 2020-04-10 04:00

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0005_question_question_kits'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choice',
            name='content',
            field=ckeditor.fields.RichTextField(),
        ),
    ]
