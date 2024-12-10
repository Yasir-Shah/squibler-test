
from nltk.corpus import wordnet
from .firebase import save_words_count, save_words_analysis

def analyze_words(text):
        
        words = text.split()
        analysis_results = {}
        for word in words:
            synsets = wordnet.synsets(word)
            if not synsets:
                analysis_results[word] = {"error": "Word not found"}
                continue

            word_analysis = []
            for synset in synsets:
                word_analysis.append({
                    "definition": synset.definition(),
                    "examples": synset.examples(),
                    "synonyms": [lemma.name() for lemma in synset.lemmas()],
                    "antonyms": [antonym.name() for lemma in synset.lemmas() for antonym in lemma.antonyms()],
                    "hypernyms": [hypernym.name().split('.')[0] for hypernym in synset.hypernyms()],
                    "hyponyms": [hyponym.name().split('.')[0] for hyponym in synset.hyponyms()],
                    "meronyms": [meronym.name().split('.')[0] for meronym in synset.part_meronyms()],
                    "holonyms": [holonym.name().split('.')[0] for holonym in synset.part_holonyms()],
                })

            analysis_results[word] = word_analysis
            save_words_count( len(words))
            save_words_analysis(analysis_results)
            return analysis_results

