from .prompt_trimmer import trim

def prompt_optimizer(prompt: str):
    trimmed_prompt = trim(prompt)
    return trimmed_prompt
