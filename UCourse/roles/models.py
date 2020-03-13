
from django.db import models
from datetime import date


class Role(models.Model):
    ADMIN = 'AD'
    TEACHER = 'TC'
    STUDENT = 'SD'
    ASSISTANT = 'AS'
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TEACHER, 'Teacher'),
        (STUDENT, 'Student'),
        (ASSISTANT, 'Teacher Assistant')
    ]
    name = models.CharField(max_length=20, unique=True)
    code = models.CharField(max_length=2, choices=ROLE_CHOICES, unique=True)
    created_date = models.DateField(default=date.today)

    def __str__(self):
        return self.name
