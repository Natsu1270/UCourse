from django.urls import path, include
from . import views

urlpatterns = [
    path('my-notifications', views.MyNotifications.as_view()),
    path('create/forum', views.CreateForumNotification.as_view()),
    path('create/register', views.CreateRegisterNotification.as_view()),
    path('read', views.ReadNotification.as_view()),
    path('delete/<int:pk>', views.DeleteNotification.as_view())
]