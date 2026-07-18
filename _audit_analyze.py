import re, sys

with open('c:/Users/Administrator/Desktop/2v2.io/games/sprunki-pvz.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Strip script, style, head
clean = re.sub(r'<script[^>]*>[\s\S]*?</script>', '', html)
clean = re.sub(r'<style[^>]*>[\s\S]*?</style>', '', clean)
clean = re.sub(r'<head[^>]*>[\s\S]*?</head>', '', clean)
# Strip all tags
text = re.sub(r'<[^>]+>', ' ', clean)
# Decode common entities
text = text.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
text = text.replace('&nbsp;', ' ').replace('&#9733;', '*')
# Collapse whitespace
text = re.sub(r'\s+', ' ', text).strip()

words = text.split()
print(f'VISIBLE_TEXT_WORD_COUNT: {len(words)}')

# Count chars
chars = len(text)
print(f'CHAR_COUNT: {chars}')

# H1, H2, H3
for tag in ['h1', 'h2', 'h3']:
    headings = re.findall(rf'<{tag}[^>]*>(.*?)</{tag}>', html)
    print(f'{tag.upper()}_COUNT: {len(headings)}')
    for h in headings:
        print(f'  {tag.upper()}: {h.strip()}')

# Sentence analysis
sentences = re.split(r'[.!?]+', text)
# Filter very short fragments
long_sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
if long_sentences:
    avg_wps = sum(len(s.split()) for s in long_sentences) / len(long_sentences)
    print(f'SENTENCE_COUNT: {len(long_sentences)}')
    print(f'AVG_WORDS_PER_SENTENCE: {avg_wps:.1f}')

# Keyword density
content_lower = text.lower()
total_words = len(words)
for kw in ['sprunki', 'pvz', 'plants vs zombies', 'incredibox', 'music', 'mod', 'free', 'online', 'plant', 'zombie', 'character', 'sound', 'beat', 'melody', 'combo']:
    count = len(re.findall(re.escape(kw), content_lower))
    density = (count / total_words * 100) if total_words > 0 else 0
    print(f'KW: "{kw}" = {count}x ({density:.2f}%)')

# Check for schema
has_schema = 'application/ld+json' in html
print(f'HAS_SCHEMA_ORG: {has_schema}')

# Check for OG tags
has_og = 'og:title' in html and 'og:description' in html
print(f'HAS_OG_TAGS: {has_og}')

# Check for hreflang
has_hreflang = 'hreflang' in html
print(f'HAS_HREFLANG: {has_hreflang}')

# Check for canonical
has_canonical = 'canonical' in html
print(f'HAS_CANONICAL: {has_canonical}')

# Image alt text
imgs = re.findall(r'<img[^>]*alt="([^"]*)"[^>]*>', html)
print(f'IMAGE_COUNT: {len(imgs)}')
for i, alt in enumerate(imgs):
    print(f'  IMG_{i+1}_ALT: "{alt}"')

# Links (internal/external)
links = re.findall(r'href="([^"]*)"', html)
internal = [l for l in links if not l.startswith('http') or '2v2.io' in l]
external = [l for l in links if l.startswith('http') and '2v2.io' not in l]
print(f'INTERNAL_LINKS: {len(internal)}')
print(f'EXTERNAL_LINKS: {len(external)}')
for el in external:
    print(f'  EXT: {el}')

# Check for structured data types
schema_types = re.findall(r'"@type"\s*:\s*"([^"]*)"', html)
print(f'SCHEMA_TYPES: {schema_types}')

# Passive voice detection (simple heuristic)
passive_markers = ['is made', 'was built', 'are designed', 'is designed', 'was created', 'are loaded', 'is loaded']
passive_count = 0
for marker in passive_markers:
    passive_count += len(re.findall(re.escape(marker), text, re.IGNORECASE))
print(f'PASSIVE_VOICE_MARKERS: {passive_count}')

# Flesch-Kincaid approximation (simple)
syllable_count = 0
vowels = 'aeiouy'
for word in words:
    word_lower = word.lower()
    if len(word_lower) <= 3:
        syllable_count += 1
    else:
        s = 0
        prev_vowel = False
        for ch in word_lower:
            if ch in vowels:
                if not prev_vowel:
                    s += 1
                prev_vowel = True
            else:
                prev_vowel = False
        if word_lower.endswith('e') and s > 1:
            s -= 1
        if s == 0:
            s = 1
        syllable_count += s

if long_sentences and total_words > 0:
    flesch = 206.835 - 1.015 * (total_words / len(long_sentences)) - 84.6 * (syllable_count / total_words)
    print(f'FLESCH_READING_EASE: {flesch:.1f}')

# Unique word count for vocabulary richness
unique_words = set(w.lower().rstrip('.,;:!?') for w in words)
print(f'UNIQUE_WORDS: {len(unique_words)}')
print(f'TYPE_TOKEN_RATIO: {len(unique_words)/len(words):.3f}')

# Content freshness signals
dates = re.findall(r'20\d{2}', html)
print(f'DATE_MENTIONS: {dates}')

# Author signals
has_author = 'By' in text and ('2v2.io' in text or 'Game Guides' in text)
print(f'HAS_AUTHOR_ATTRIBUTION: {has_author}')
