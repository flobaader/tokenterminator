from llmlingua import PromptCompressor

llm_lingua = PromptCompressor()


def trim(prompt: str):
    compressed_prompt = llm_lingua.compress_prompt(prompt, instruction="", question="")
    return compressed_prompt