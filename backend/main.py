import asyncio
import os
from dotenv import load_dotenv
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from services.llm_service import LLMInteractionService
from services.model_output_comparison import ModelOutputComparison
from services.prompt_trimmer import TextProcessor
from services.token_tracker import TokenTracker
from services.energy_calculator import EnergyCalculator
from services.cache import CacheService

#load OpenAI API key from .env
load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

#Inject Services
def get_llm_service():
    return LLMInteractionService(api_key=api_key)

def get_comparison_service():
    return ModelOutputComparison()

def get_token_tracker():
    return TokenTracker()

def get_energy_calculator():
    return EnergyCalculator()

def get_cache_service():
    return CacheService()

# Initialize the FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://tokenterminator.deploy.selectcode.dev", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Define response model
class GreenGPTResponse(BaseModel):
    optimizedPrompt: str
    optimizedAnswer: str
    originalAnswer: str
    isCached: bool = False

class AnalysisResponse(BaseModel):
    similarityScoreCosine: float  # Assume a similarity score (0 to 1)
    similarityScoreGPT: float
    originalTokens: int
    optimizedTokens: int
   # tokenSavings: int
   # tokenSavingsPercentage: float
    energySavedWatts: float
    costSavedDollars: float
    

# Define request model
class PromptRequest(BaseModel):
    prompt: str = "Example prompt"


# Define request model
class AnalyzePromptRequest(BaseModel):
    originalPrompt: str = "Example prompt"
    optimizedPrompt: str = "Optimzed prompt"
    originalAnswer: str = "Original Answer"
    optimizedAnswer: str = "Optimized Answer"
    

# Sample endpoint that returns the JSON
@app.post("/optimize-prompt", response_model=GreenGPTResponse)
async def optimize_prompt(
    request: PromptRequest,
    llm_service: LLMInteractionService = Depends(get_llm_service),
    cache_service: CacheService = Depends(get_cache_service)
):
    result = await cache_service.check_cache(request.prompt)
    if result.cached:
        response = GreenGPTResponse(
        optimizedPrompt= "None",
        optimizedAnswer= result.answer,
        originalAnswer= "None",
        isCached = True
        )
        return response
    
    AI_COMPRESS = False
    if AI_COMPRESS:
        from services.prompt_trimmer2 import trim
        trimmed_prompt = trim(request.prompt)
    else:
        processor = TextProcessor()
        trimmed_prompt = processor.trim(request.prompt)

    
    original_answer, optimized_answer = await asyncio.gather(
        llm_service.get_answer(request.prompt),
        llm_service.get_answer(trimmed_prompt)
    )

    cache_service.save_cache(request.prompt, optimized_answer)

    response = GreenGPTResponse(
        optimizedPrompt= trimmed_prompt,
        optimizedAnswer=optimized_answer,
        originalAnswer=original_answer,
        isCached = False
    )
    return response

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze(
                req: AnalyzePromptRequest,
                  comparison_service: ModelOutputComparison = Depends(get_comparison_service),
                  token_tracker: TokenTracker = Depends(get_token_tracker),
                  energy_calculator: EnergyCalculator = Depends(get_energy_calculator),
                  cache_service: CacheService = Depends(get_cache_service)):
    
        # Check cache for existing analysis
    cache_result = cache_service.check_cache(req.originalPrompt)

    if cache_result.cached:
        
        original_tokens = token_tracker.count_tokens(req.originalPrompt)
        optimized_tokens = 0
        token_savings = optimized_tokens

        energy_saved_watts = energy_calculator.calculate_energy_saving(original_tokens)
        cost_saved_dollars = energy_calculator.calculate_cost_saving(original_tokens)

        # If a cached result is found, return it directly
        return AnalysisResponse(
            similarityScoreCosine=-1,
            similarityScoreGPT=-1,
            originalTokens = original_tokens,
            optimizedTokens=optimized_tokens,
            energySavedWatts= energy_saved_watts,
            costSavedDollars= cost_saved_dollars
        )
    
    # Calculate similarity
    similarity_score_cosine = comparison_service.calculate_similarity(req.originalAnswer, req.optimizedAnswer)
    similarity_score_gpt = comparison_service.gpt_similarity(req.originalPrompt, req.originalAnswer, req.optimizedAnswer)

    # Calculate token counts and savings
    original_tokens = token_tracker.count_tokens(req.originalPrompt)
    optimized_tokens = token_tracker.count_tokens(req.optimizedPrompt)

    # Calculate energy and cost savings
    energy_saved_watts = energy_calculator.calculate_energy_saving(token_savings)
    cost_saved_dollars = energy_calculator.calculate_cost_saving(token_savings)

    response = AnalysisResponse(
        similarityScoreCosine=similarity_score_cosine,
        similarityScoreGPT=similarity_score_gpt,
        originalTokens = original_tokens,
        optimizedTokens=optimized_tokens,
        energySavedWatts= energy_saved_watts,
        costSavedDollars= cost_saved_dollars
    )
    return response


@app.post("/test")
async def test_cache(
    request: PromptRequest,
    cache_service: CacheService = Depends(get_cache_service)
):
    result = await cache_service.check_cache(request.prompt)
    return {"querry": request.prompt, "answer": result.answer, "cached": result.cached}
