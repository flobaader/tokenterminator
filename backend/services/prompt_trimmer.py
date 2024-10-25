import re
from typing import Optional, List, Tuple

import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, SnowballStemmer, LancasterStemmer

nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('punkt_tab', quiet=True)

ARTICLES_PREPOSITIONS = {
    "english": ['the', 'a', 'an', 'in', 'on', 'at', 'for', 'to', 'of']
}

NEGATION_WORDS = {
    "english": [
        'no', 'nor', 'not', 'don', "dont", 'ain', 'aren', "arent", 'couldn',
        "couldnt", 'didn', "didnt", 'doesn', "doesnt", 'hadn', "hadnt", 'hasn',
        "hasnt", 'haven', "havent", 'isn', "isnt", 'mightn', "mightnt", 'mustn',
        "mustnt", 'needn', "neednt", 'shan', "shant", 'shouldn', "shouldnt",
        'wasn', "wasnt", 'weren', "werent", 'won', "wont", 'wouldn', "wouldnt",
    ],
}

PUNCTUATION = [".", ",", "'", '"', "!", "?", ";", ":", "-"]

class SuffixArray:
    """Helper class for building suffix arrays and LCP arrays"""
    def __init__(self, text: str):
        self.text = text
        self.n = len(text)
        
    def build_suffix_array(self) -> List[int]:
        """Build suffix array using prefix doubling"""
        suffixes = [(self.text[i:], i) for i in range(self.n)]
        suffixes.sort()
        return [pos for _, pos in suffixes]

    def build_lcp_array(self, suffix_array: List[int]) -> List[int]:
        """Build LCP array using Kasai's algorithm"""
        lcp = [0] * self.n
        rank = [0] * self.n
        for i in range(self.n):
            rank[suffix_array[i]] = i
            
        k = 0
        for i in range(self.n):
            if rank[i] == self.n - 1:
                k = 0
                continue
                
            j = suffix_array[rank[i] + 1]
            while i + k < self.n and j + k < self.n and self.text[i + k] == self.text[j + k]:
                k += 1
            lcp[rank[i]] = k
            if k > 0:
                k -= 1
        return lcp
    
class TextProcessor:
    """
    Enhanced text processor with trimming and integrated chunk removal
    """
    def __init__(self, language: str = "english"):
        self.language = language
        if language not in stopwords.fileids():
            raise ValueError("Unsupported language")
        
        self.nltk_stopwords = stopwords.words(language)
        self.words_to_exclude = set(
            self.nltk_stopwords + ARTICLES_PREPOSITIONS.get(language, [])
        ) - set(NEGATION_WORDS.get(language, []))

    def trim(
        self,
        text: str,
        stemmer: Optional[str] = None,
        remove_spaces: bool = True,
        remove_stopwords: bool = True,
        remove_punctuation: bool = True,
        remove_chunks: bool = True,
        min_chunk_length: int = 5,
        min_chunk_occurrences: int = 2,
        keep_first_chunk: bool = True  # Keep the first occurrence of each chunk
    ) -> str:
        accepted_stemmers = ("snowball", "porter", "lancaster")
        if stemmer and stemmer not in accepted_stemmers:
            raise ValueError("Stemmer must be one of", accepted_stemmers)

        # Merge contractions early
        text = text.replace("'", "").replace("'", "")

        # First pass: identify sentence boundaries and chunks
        sentences = nltk.sent_tokenize(text)
        processed_text = text

        # Remove repeated chunks if requested
        if remove_chunks:
            # Find all repeated chunks
            chunks = self.find_repeated_chunks(
                processed_text,
                min_length=min_chunk_length,
                min_occurrences=min_chunk_occurrences
            )
            
            # Filter out overlapping chunks
            non_overlapping_chunks = self.find_non_overlapping_chunks(chunks)
            
            # Sort chunks by position (reversed) to remove from end to start
            for chunk, positions, _ in sorted(non_overlapping_chunks, 
                                           key=lambda x: (-x[1][0], -len(x[0]))):
                # Skip the first occurrence if keep_first_chunk is True
                chunk_positions = positions[1:] if keep_first_chunk else positions
                
                # Remove chunks from end to start to maintain position accuracy
                for pos in sorted(chunk_positions, reverse=True):
                    processed_text = (
                        processed_text[:pos] + 
                        " " +  # Add space to prevent word joining
                        processed_text[pos + len(chunk):]
                    )

        # Tokenize words after chunk removal
        tokenized = nltk.word_tokenize(processed_text)

        if remove_punctuation:
            tokenized = [word for word in tokenized if word not in PUNCTUATION]

        if remove_stopwords:
            tokenized = [word for word in tokenized if word.lower() not in self.words_to_exclude]

        words = tokenized

        # Apply stemming if requested
        if stemmer:
            stemmer_instance = self._get_stemmer(stemmer)
            words = [stemmer_instance.stem(word) for word in tokenized]
            words = self._restore_case(words, tokenized)

        # Join words
        join_str = "" if remove_spaces else " "
        trimmed = join_str.join(words).strip()
        
        # Clean up multiple spaces that might have been introduced
        trimmed = re.sub(r'\s+', ' ', trimmed)
        
        if not remove_punctuation:
            # Remove spaces before punctuation
            trimmed = re.sub(r"\s([?.!,:;])", r"\1", trimmed)

        return trimmed

    def find_repeated_chunks(
        self,
        text: str,
        min_length: int = 3,
        min_occurrences: int = 2,
        preprocess: bool = False,
        **preprocess_kwargs
    ) -> List[Tuple[str, List[int], int]]:
        """
        Find repeated chunks in text with optional preprocessing
        
        Args:
            text: Input text
            min_length: Minimum length of chunks to consider
            min_occurrences: Minimum number of occurrences to report
            preprocess: Whether to preprocess text using trim() first
            **preprocess_kwargs: Arguments to pass to trim() if preprocess=True
        
        Returns:
            List of tuples: (chunk, positions, occurrences)
        """
        if preprocess:
            text = self.trim(text, **preprocess_kwargs)
            
        sa_builder = SuffixArray(text)
        suffix_array = sa_builder.build_suffix_array()
        lcp_array = sa_builder.build_lcp_array(suffix_array)
        
        # Find repeated chunks
        repeated_chunks = []
        i = 0
        while i < len(lcp_array):
            if lcp_array[i] >= min_length:
                length = lcp_array[i]
                positions = [suffix_array[i]]
                j = i + 1
                
                while j < len(lcp_array) and lcp_array[j] >= length:
                    positions.append(suffix_array[j])
                    j += 1
                
                if len(positions) >= min_occurrences:
                    chunk = text[positions[0]:positions[0] + length]
                    repeated_chunks.append((chunk, positions, len(positions)))
                
                i = j
            else:
                i += 1
        
        repeated_chunks.sort(key=lambda x: (-len(x[1]), -len(x[0])))
        return repeated_chunks

    def find_non_overlapping_chunks(
        self,
        chunks: List[Tuple[str, List[int], int]]
    ) -> List[Tuple[str, List[int], int]]:
        """
        Filter out chunks that are part of larger chunks
        """
        if not chunks:
            return []
            
        filtered_chunks = []
        used_positions = set()
        
        for chunk, positions, occurrences in chunks:
            chunk_positions = set(range(pos, pos + len(chunk)) for pos in positions)
            if not any(pos in used_positions for positions_set in chunk_positions for pos in positions_set):
                filtered_chunks.append((chunk, positions, occurrences))
                used_positions.update(pos for positions_set in chunk_positions for pos in positions_set)
                
        return filtered_chunks

    def _get_stemmer(self, stemmer_name: str):
        """Get the appropriate stemmer instance"""
        if stemmer_name == "porter":
            return PorterStemmer()
        elif stemmer_name == "snowball":
            return SnowballStemmer(self.language)
        elif stemmer_name == "lancaster":
            return LancasterStemmer()
        
    def _restore_case(self, stemmed_words: List[str], original_words: List[str]) -> List[str]:
        """Restore original case after stemming"""
        case_restored = []
        for stemmed, original in zip(stemmed_words, original_words):
            if original.istitle():
                stemmed = stemmed.title()
            elif original.isupper():
                stemmed = stemmed.upper()
            case_restored.append(stemmed)
        return case_restored


def demo():
    """Demo usage of TextProcessor"""
    text = """
    The quick brown fox jumps over the lazy dog. 
    The quick brown fox jumps over another lazy dog.
    Meanwhile, a quick brown fox was seen jumping over a lazy dog.
    Some people say the quick brown fox is tired of jumping over lazy dogs.
    """
    
    processor = TextProcessor()
    
    # Demo basic trimming
    print("Original text:", text)
    trimmed = processor.trim(text, stemmer="porter", remove_stopwords=True)
    print("\nTrimmed text:", trimmed)
    
    # Demo chunk finding
    print("\nFinding repeated chunks...")
    chunks = processor.find_repeated_chunks(text, min_length=5, min_occurrences=2)
    filtered_chunks = processor.find_non_overlapping_chunks(chunks)
    
    print(f"\nFound {len(filtered_chunks)} non-overlapping repeated chunks:\n")
    for chunk, positions, occurrences in filtered_chunks:
        print(f"Chunk (occurs {occurrences} times): '{chunk}'")
        print(f"Positions: {positions}")
        print()

if __name__ == "__main__":
    demo()