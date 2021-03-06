from django.urls import path
from . import views

urlpatterns = [
    path('students', views.GetListSummary.as_view()),
    path('update', views.UpdateSummary.as_view()),
    path('multi-update', views.MultiUpdateSummary.as_view()),
    path('student', views.GetStudentSummary.as_view()),
    path('search', views.SearchSummary.as_view())
]