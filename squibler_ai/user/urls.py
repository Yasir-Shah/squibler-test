from django.urls import path
from .views import ProfileView, SignupView, LoginView

urlpatterns = [
    path('profile/', ProfileView.as_view(), name='profile'),
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
]