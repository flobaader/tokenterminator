import os
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from openai import OpenAI

class ModelOutputComparison:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')

    def calculate_similarity(self, original: str, optimized: str) -> float:
        embeddings = self.model.encode([original, optimized])
        return cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    

    comparison_prompt = """
You are tasked with calculating a similarity score between two answers provided by a language model (LLM) in response to a given question. Your goal is to determine how similar the answers are in terms of content, focusing on whether important facts, concepts, and arguments are present in both responses.

Here is the original question that was asked:
<question>
{{QUESTION}}
</question>

Now, here are the two answers provided by the LLM that you need to compare:

<answer1>
{{ANSWER1}}
</answer1>

<answer2>
{{ANSWER2}}
</answer2>

To calculate the similarity score, follow these steps:

1. Carefully read and analyze both answers, identifying the key elements:
   a. Important facts
   b. Main concepts
   c. Central arguments or points

2. Create a list of these key elements for each answer.

3. Compare the lists and determine:
   a. Which key elements are present in both answers
   b. Which key elements are unique to each answer
   c. Any significant differences in how the shared elements are presented or explained

4. Consider the overall structure and flow of the answers. Are they organized similarly?

5. Evaluate the depth and breadth of information provided in each answer.

6. Calculate a similarity score on a scale of 0 to 100, where:
   - 0 means the answers are completely different with no shared important information
   - 100 means the answers are identical in all important aspects
   - Scores in between reflect partial similarity, with higher scores indicating greater similarity

Provide your analysis and justification for the similarity score in a <justification> tag. Include specific examples from the answers to support your reasoning.

After your justification, provide the final similarity score in a <score> tag.

Your response should follow this format:

<justification>
[Your detailed analysis and justification here]
</justification>

<score>[Your similarity score from 0 to 100]</score>"""


    def gpt_similarity(self, question: str, original_answer: str, optimized_answer: str) -> float:
        # Format the comparison prompt with the answers
        formatted_prompt = self.comparison_prompt.replace(
            "{{QUESTION}}", question
        ).replace(
            "{{ANSWER1}}", original_answer
        ).replace(
            "{{ANSWER2}}", optimized_answer
        )
        
        client = OpenAI(
            # This is the default and can be omitted
            api_key=os.environ.get("OPENAI_API_KEY"),
        )

        try:
            # Create chat completion request
            response = client.chat.completions.create(
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert at analyzing and comparing text responses."
                    },
                    {
                        "role": "user",
                        "content": formatted_prompt
                    }
                ],
                model="gpt-4o-mini",
                temperature=0.3  # Lower temperature for more consistent scoring
            )
            
            # Extract response content
            result = response.choices[0].message.content

            print("Got the following response from the comparision Service:", result)
            
            # Extract score from the response
            try:
                # Find the score tag
                score_start = result.find("<score>") + len("<score>")
                score_end = result.find("</score>")
                
                if score_start == -1 or score_end == -1:
                    raise ValueError("Score tags not found in response")
                    
                # Extract and convert score to float
                score_text = result[score_start:score_end].strip()
                score = float(score_text)
                
                # Validate score is within expected range
                if not (0 <= score <= 100):
                    raise ValueError(f"Score {score} is outside valid range [0, 100]")
                    
                return float(score/100)
                
            except (ValueError, IndexError) as e:
                print(f"Error extracting score: {str(e)}")
                print(f"Full response: {result}")
                return 0.0
                
        except Exception as e:
            print(f"Error during API call: {str(e)}")
            return 0.0
            