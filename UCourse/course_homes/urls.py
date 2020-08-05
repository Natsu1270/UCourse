from django.urls import path

from . import views

app_name = 'course_homes'

urlpatterns = [
    path('register', views.RegisterClassAPI.as_view(), name='student_register'),
    path('unregister', views.UnRegisterClassAPI.as_view()),
    path('my', views.UserCourseHomeListAPI.as_view(), name='user_course_home_list'),
    path('check', views.CheckClassOwnership.as_view()),
    path('<str:slug>', views.CourseHomeDetailAPI.as_view(), name='course_home_detail'),
    path('show/class', views.CourseHomeShowAPI.as_view()),
    path('show/class/<str:slug>', views.CourseHomeDetailShowAPI.as_view()),
    path('learning_topic/create', views.CreateLearningTopic.as_view()),
    path('learning_topic/<int:pk>', views.EditLearningTopic.as_view())
]
