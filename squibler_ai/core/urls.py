from django.urls import path
from .views import GrammarSuggestionsView

urlpatterns = [
    path("suggestions/", GrammarSuggestionsView.as_view(), name="suggestions"),
]