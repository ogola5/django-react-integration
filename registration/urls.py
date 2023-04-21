# urls.py
from django.urls import path
from . import views
from .views import CustomUserListCreateView, CustomUserRetrieveUpdateDestroyView, login_user

app_name = 'registration'

urlpatterns = [
    path('api/users/', CustomUserListCreateView.as_view(), name='user-list-create'),
    path('api/users/<int:pk>/', CustomUserRetrieveUpdateDestroyView.as_view(), name='user-retrieve-update-destroy'),
    path('api/login/', login_user, name='login'),
]
