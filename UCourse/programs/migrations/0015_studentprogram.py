# Generated by Django 3.0.7 on 2020-08-30 11:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('programs', '0014_auto_20200823_1445'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentProgram',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(blank=True, default='on_going', max_length=20, null=True)),
                ('started_date', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('completed_date', models.DateField(blank=True, default=django.utils.timezone.now, null=True)),
                ('received_certificate', models.BooleanField(blank=True, default=False, null=True)),
                ('program', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programs.Program')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]