import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
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

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tokenterminator.deploy.selectcode.dev, http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


# Define response model
class GreenGPTResponse(BaseModel):
    optimizedPrompt: str
    optimizedAnswer: str
    originalAnswer: str
    savedEnergy: float  # Assume this is a percentage or a metric you've calculated
    similarityScore: float  # Assume a similarity score (0 to 1)
    optimizedTokens: int


# Define request model
class PromptRequest(BaseModel):
    prompt: str = "Example prompt"

# Sample endpoint that returns the JSON
@app.post("/optimize-prompt", response_model=GreenGPTResponse)
async def optimize_prompt(
    request: PromptRequest,
    llm_service: LLMInteractionService = Depends(get_llm_service),  # Inject LLM service
    comparison_service: ModelOutputComparison = Depends(get_comparison_service) # Inject Comparison service
):
    # Use LLMInteractionService to get the original answer
    original_answer = llm_service.get_answer(request.prompt)
    optimized_answer = original_answer # for testing 
    
    # Calculate similarity
    similarity_score_cosine = comparison_service.calculate_similarity(original_answer, optimized_answer)
    similarity_score_gpt = comparison_service.gpt_similarity(request.prompt, original_answer, optimized_answer)

    # Placeholder logic for other response values (replace with actual processing)
    response = GreenGPTResponse(
        optimizedPrompt="Optimized " + request.prompt,
        optimizedAnswer=optimized_answer,
        originalAnswer=original_answer,
        savedEnergy=15.2,  # Placeholder value
        similarityScoreCosine=similarity_score_cosine,  # Placeholder value
        similarityScoreGPT=similarity_score_gpt,
        optimizedTokens=50  # Placeholder value
    )
    return response


# generate a test post endpoint
@app.post("/test")
async def test(prompt: Optional[str] = "Example text"):
    return {"message": prompt}
