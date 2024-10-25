import os
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from services.llm_service import LLMInteractionService
from services.model_output_comparison import ModelOutputComparison

#load OpenAI API key from .env
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

#Inject Services
def get_llm_service():
    return LLMInteractionService(api_key=api_key)

def get_comparison_service():
    return ModelOutputComparison()


# Initialize the FastAPI app
app = FastAPI()

# Define response model
class GreenGPTResponse(BaseModel):
    optimizedPrompt: str
    optimizedAnswer: str
    originalAnswer: str
    savedEnergy: float  # Assume this is a percentage or a metric you've calculated
    similarityScore: float  # Assume a similarity score (0 to 1)
    optimizedTokens: int

# Sample endpoint that returns the JSON
@app.post("/optimize-prompt", response_model=GreenGPTResponse)
async def optimize_prompt(prompt: Optional[str] = "Example prompt"):
    # Placeholder logic for response (replace with actual processing)
    response = GreenGPTResponse(
        optimizedPrompt="Optimized " + prompt,
        optimizedAnswer="This is an optimized answer.",
        originalAnswer="This is the original answer to compare.",
        savedEnergy=15.2,  # Placeholder value
        similarityScore=0.85,  # Placeholder value
        optimizedTokens=50  # Placeholder value
    )
    print("test")
    return response


# generate a test post endpoint
@app.post("/test")
async def test(text: Optional[str] = "Example text"):
    return {"message": text}
