from openai import OpenAI


class LLMInteractionService:
    def __init__(self, api_key: str):
        self.client = OpenAI(
            # This is the default and can be omitted
            api_key=api_key,
        )

    def get_answer(self, prompt: str) -> str:
        # Create chat completion request
        response = self.client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            model="gpt-4o-mini",
            temperature=0.3  # Lower temperature for more consistent scoring
        )
        
        # Extract response content
        result = response.choices[0].message.content
        return result
