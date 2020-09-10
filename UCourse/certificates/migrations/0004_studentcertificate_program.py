# Generated by Django 3.0.7 on 2020-09-09 07:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('programs', '0025_auto_20200906_1020'),
        ('certificates', '0003_auto_20200906_1316'),
    ]

    operations = [
        migrations.AddField(
            model_name='studentcertificate',
            name='program',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='programs.Program'),
        ),
    ]