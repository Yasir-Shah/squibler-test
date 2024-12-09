from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from nltk.corpus import wordnet
from .open_api_singleton import OpenAIClientSingleton


class GrammarSuggestionsView(APIView):
    permission_classes = []

    def post(self, request):
        text = request.data.get("text", "")
        if not text:
            return Response({"error": "Text input is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            client_singleton = OpenAIClientSingleton()
            openai_client = client_singleton.get_client()
            response = openai_client.chat.completions.create(
                messages=[{
                    "role": "user",
                    "content": f"I want you to provide two sections: grammar suggestions and detailed content recommendations in HTML format with proper headings, subheadings, bullet points, and paragraphs for the content: {text}. Please include only the content within `<body>` tags, without `<html>`, `<head>`, or `<title>` tags. The response should start and end with `<body>` tags.",
                }],
                model="gpt-4o",
            )

            choices = response.choices
            if not choices:
                return Response({"error": "Invalid response from AI service."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            message_content = choices[0].message.content
            return Response(message_content)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class WordAnalysisView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, word):
        synsets = wordnet.synsets(word)

        if not synsets:
            return Response({"error": "Word not found."}, status=status.HTTP_404_NOT_FOUND)

        word_analysis = []
        for synset in synsets:
            word_analysis.append({
                "definition": synset.definition(),
                "examples": synset.examples(),
                "hypernyms": [hypernym.name().split('.')[0] for hypernym in synset.hypernyms()],
                "hyponyms": [hyponym.name().split('.')[0] for hyponym in synset.hyponyms()],
                "meronyms": [meronym.name().split('.')[0] for meronym in synset.part_meronyms()],
                "holonyms": [holonym.name().split('.')[0] for holonym in synset.part_holonyms()],
                "antonyms": [antonym.name().split('.')[0] for antonym in synset.lemmas()[0].antonyms()],
            })

        return Response({"word_analysis": word_analysis}, status=status.HTTP_200_OK)

from .utils import setFirebaseSetup

class TestApi(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        setFirebaseSetup()
        return Response({"word_analysis": "word_analysis"}, status=status.HTTP_200_OK)