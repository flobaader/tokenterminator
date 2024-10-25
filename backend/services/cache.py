from dataclasses import dataclass
from typing import Dict, List, Tuple
import logging
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class CacheResult:
    answer: str
    cached: bool

class CacheService:
    _instance = None
    _cache: Dict[str, str] = {}
    _embeddings: Dict[str, List[float]] = {}
    _similarity_threshold = 0.85  # ADJUST HERE!!!!!!

    # Singleton pattern
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.model = SentenceTransformer('all-MiniLM-L6-v2')
        return cls._instance

    def _compute_embedding(self, text: str) -> List[float]:
        return self.model.encode(text).tolist()

    def _find_similar_query(self, query: str) -> Tuple[str, float]:
        query_embedding = self._compute_embedding(query)
        
        max_similarity = 0
        most_similar_key = None

        for cached_key, cached_embedding in self._embeddings.items():
            # Use sklearn's cosine_similarity like in ModelOutputComparison
            similarity = cosine_similarity([query_embedding], [cached_embedding])[0][0]
            
            if similarity > max_similarity:
                max_similarity = similarity
                most_similar_key = cached_key

        return most_similar_key, max_similarity

    async def check_cache(self, key: str) -> CacheResult:
        # First, try to find a semantically similar query
        similar_key, similarity = self._find_similar_query(key)
        
        if similar_key and similarity >= self._similarity_threshold:
            logger.info(f"Found semantically similar cache entry. Similarity: {similarity:.2f}")
            return CacheResult(
                answer=self._cache[similar_key],
                cached=True
            )

        # If no similar query found, create new cache entry
        self._cache[key] = f"New generated answer for: {key}"
        self._embeddings[key] = self._compute_embedding(key)
        logger.info(f"Stored new value in cache for key: {key}")
        
        return CacheResult(
            answer=self._cache[key],
            cached=False
        )
