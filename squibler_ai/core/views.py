from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from user.user_permission import IsAdmin, IsEditor, IsViewer
from .open_api_singleton import OpenAIClientSingleton
from .utils import analyze_words
import threading

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
            #Note: here we can use Celery. It is better to use Celery. I didn't use for now because you will need to setup to run locally
            threading.Thread(target=analyze_words, args=(text,)).start()
            message_content = choices[0].message.content
            return Response(message_content)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class AdminOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        return Response({"message": "Hello, Admin!"})


class EditorOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsEditor]

    def get(self, request):
        return Response({"message": "Hello, Editor or Admin!"})


class ViewerView(APIView):
    permission_classes = [IsAuthenticated, IsViewer]

    def get(self, request):
        return Response({"message": "Hello, Viewer, Editor, or Admin!"})
