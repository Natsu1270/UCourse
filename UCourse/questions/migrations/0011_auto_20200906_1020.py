# Generated by Django 3.0.7 on 2020-09-06 03:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0010_remove_questionkit_code'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='choice',
            table='Choice',
        ),
        migrations.AlterModelTable(
            name='question',
            table='Question',
        ),
        migrations.AlterModelTable(
            name='questionkit',
            table='QuestionKit',
        ),
    ]