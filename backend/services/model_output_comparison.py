from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer

class ModelOutputComparison:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def calculate_similarity(self, original: str, optimized: str) -> float:
        embeddings = self.model.encode([original, optimized])
        return cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]