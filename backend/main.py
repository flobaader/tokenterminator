from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

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
@app.get("/optimize-prompt", response_model=GreenGPTResponse)
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
    return response
