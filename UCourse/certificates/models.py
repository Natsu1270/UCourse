from django.db import models
from django.utils import timezone

from course_homes.models import CourseHome
from courses.models import Course
from programs.models import Program
from ucourse import settings


class Certificate(models.Model):
    name = models.CharField(max_length=255, unique=True)
    code = models.CharField(max_length=10, unique=True)
    certificate_type = models.CharField(max_length=50, blank=True, null=True)
    effective_time = models.IntegerField()

    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name

    class Meta:
        db_table = 'Certificate'


class StudentCertificate(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    course_home = models.ForeignKey(CourseHome, on_delete=models.SET_NULL, null=True)
    program = models.ForeignKey(Program, on_delete=models.SET_NULL, null=True)
    file = models.FileField(upload_to='certificates/file')
    uuid = models.CharField(max_length=100, blank=True, null=True)
    received_date = models.DateField(default=timezone.now)

    class Meta:
        db_table = 'StudentCertificate'
