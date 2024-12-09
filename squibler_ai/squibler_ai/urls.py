from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/', include('user.urls')),  # User app URLs
    path('api/core/', include('core.urls')),  # Core app URLs
]
