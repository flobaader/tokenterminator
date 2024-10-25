from dataclasses import dataclass
from typing import Dict
import logging

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

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance

    def check_cache(self, key: str) -> CacheResult:
        if key in self._cache:
            logger.info(f"Found value in cache for key: {key}")
            return CacheResult(
                answer=self._cache[key],
                cached=True
            )
        else:
            self._cache[key] = f"New generated answer for: {key}"
            logger.info(f"Stored new value in cache for key: {key}")
        
            return CacheResult(
                answer=self._cache[key],
                cached=False
            )
