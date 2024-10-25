import openai

class LLMInteractionService:
    def __init__(self, api_key: str):
        openai.api_key = api_key

    def get_answer(self, prompt: str) -> str:
        # Communicate with OpenAI GPT
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=50
        )
        return response.choices[0].text.strip()
