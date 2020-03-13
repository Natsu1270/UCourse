from django.urls import path, include
from knox import views as knox_views

from . import views


app_name = 'users'

urlpatterns = [
    path('', include('knox.urls')),
    path('register', views.RegisterAPI.as_view(), name='register'),
    path('login', views.LoginAPI.as_view(), name='login'),
    path('logout', knox_views.LogoutView.as_view(), name='knox-logout'),
    path('user', views.UserAPI.as_view(), name='user-detail'),
    path('users', views.UserListAPI.as_view(), name='user-list'),
]
