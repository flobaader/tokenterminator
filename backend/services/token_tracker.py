import tiktoken

class TokenTracker:
    def __init__(self, model_name: str = "gpt-3.5-turbo"):
        self.encoder = tiktoken.encoding_for_model(model_name)

    def count_tokens(self, text: str) -> int:
        tokens = self.encoder.encode(text)
        return len(tokens)

    def optimized_tokens(self, original_text: str, optimized_text: str) -> int:
        original_tokens = self.count_tokens(original_text)
        optimized_tokens = self.count_tokens(optimized_text)
        token_saving = original_tokens - optimized_tokens
        return token_saving if token_saving > 0 else 0  # Ensures no negative values
