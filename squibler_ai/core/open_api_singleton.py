from openai import OpenAI
from squibler_ai import settings

class OpenAIClientSingleton:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(OpenAIClientSingleton, cls).__new__(cls)
            cls._instance._init_client(settings.OPEN_API_KEY)
        return cls._instance

    def _init_client(self, api_key):
        """Initialize the OpenAI client."""
        self.client = OpenAI(api_key=api_key)

    def get_client(self):
        """Return the OpenAI client."""
        return self.client
