# Generated by Django 3.0.3 on 2020-04-04 15:23

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0011_auto_20200404_2157'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coursedetail',
            name='benefits',
            field=ckeditor.fields.RichTextField(blank=True, help_text='What you will learn', null=True),
        ),
        migrations.AlterField(
            model_name='coursedetail',
            name='full_description',
            field=ckeditor.fields.RichTextField(blank=True, null=True),
        ),
    ]