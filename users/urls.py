from django.urls import path, include
from . import views
from knox import views as knox_views
urlpatterns = [
  path('auth', include('knox.urls')),
  path('auth/register', views.RegisterAPI.as_view()),
  path('auth/login', views.LoginAPI.as_view()),
  path('auth/user', views.UserAPI.as_view()),
  path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]