from django.urls import path
from .views import GrammarSuggestionsView, WordAnalysisView, TestApi

urlpatterns = [
    path("suggestions/", GrammarSuggestionsView.as_view(), name="suggestions"),
    path("word-analysis/<str:word>/", WordAnalysisView.as_view(), name="word_analysis"),
    path("test/", TestApi.as_view(), name="word_analysis"),


]