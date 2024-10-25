from openai import AsyncOpenAI


class LLMInteractionService:
    def __init__(self, api_key: str):
        self.client = AsyncOpenAI(
            # This is the default and can be omitted
            api_key=api_key,
        )

    async def get_answer(self, prompt: str) -> str:
        # Create chat completion request
        response = await self.client.chat.completions.create(
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
