import re

with open('c:/Users/Administrator/Desktop/2v2.io/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Strip style/script
text = re.sub(r'<style[^>]*>.*?</style>', '', html, flags=re.DOTALL)
text = re.sub(r'<script[^>]*>.*?</script>', '', text, flags=re.DOTALL)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'&[a-z]+;', ' ', text)
text = re.sub(r'\s+', ' ', text).strip()

words = text.split()
total_words = len(words)
sentences = re.split(r'[.!?]+', text)
sentences = [s.strip() for s in sentences if len(s.strip().split()) > 0]
total_sentences = len(sentences)
avg_wps = total_words / total_sentences if total_sentences > 0 else 0

total_syllables = 0
for word in words:
    syll = len(re.findall(r'[aeiouyAEIOUY]+', word))
    if syll == 0:
        syll = 1
    total_syllables += syll
avg_spw = total_syllables / total_words if total_words > 0 else 0

flesch = 206.835 - 1.015 * avg_wps - 84.6 * avg_spw
fk_grade = 0.39 * avg_wps + 11.8 * avg_spw - 15.59

h1 = len(re.findall(r'<h1[^>]*>', html))
h2 = len(re.findall(r'<h2[^>]*>', html))
h3 = len(re.findall(r'<h3[^>]*>', html))
img = len(re.findall(r'<img[^>]*>', html))
links = len(re.findall(r'<a[^>]*href=', html))
ext = len(re.findall(r'<a[^>]*href=\"https?://', html))
structured = 'application/ld+json' in html
faq = 'FAQPage' in html
howto = 'HowTo' in html

print(f"TOTAL WORDS: {total_words}")
print(f"SENTENCES: {total_sentences}")
print(f"AVG WORDS/SENTENCE: {avg_wps:.1f}")
print(f"AVG SYLLABLES/WORD: {avg_spw:.2f}")
print(f"FLESCH READING EASE: {flesch:.1f}")
print(f"FLESCH-KINCAID GRADE LEVEL: {fk_grade:.1f}")
print(f"H1: {h1}, H2: {h2}, H3: {h3}")
print(f"IMAGES: {img}")
print(f"TOTAL LINKS: {links}")
print(f"EXTERNAL LINKS: {ext}")
print(f"STRUCTURED DATA: {structured}")
print(f"FAQ SCHEMA: {faq}")
print(f"HOWTO SCHEMA: {howto}")

text_lower = text.lower()
for kw in ['sprunki pyramixed', 'sprunki', 'pyramixed', 'incredibox', 'pyramix', 'music creation', 'horror mode', 'drag', 'drop']:
    count = text_lower.count(kw)
    kw_words = len(kw.split())
    density = (count * kw_words / total_words * 100) if total_words > 0 else 0
    print(f'KW "{kw}": {count}x | density {density:.2f}%')

# Check for AI signals
ai_signals = []
generic_phrases = ['dive into', 'unleash your', 'in the world of', 'take your', 'whether you are', 'looking for', 'perfect for']
for phrase in generic_phrases:
    if phrase in text_lower:
        ai_signals.append(phrase)

# Check for specificity
has_stats = bool(re.search(r'\d+%|\d+\s*(seconds|minutes|bars|characters|variants|phases)', text_lower))
has_measurements = bool(re.search(r'\d+\s*(inch|cm|px|mb|gb)', text_lower))
has_technical_detail = bool(re.search(r'stereo|frequency|minor.key|arpeggiat|4\s*bar|8\s*bar', text_lower))

print(f"\n--- AI SIGNAL CHECK ---")
print(f"Generic phrases found: {ai_signals if ai_signals else 'None'}")
print(f"Specific stats/numbers: {has_stats}")
print(f"Technical audio detail: {has_technical_detail}")

# Check author bio / expertise signals
has_author = bool(re.search(r'author|written by|created by|editorial team', text_lower))
has_credentials = bool(re.search(r'developer|creator|community|discord', text_lower))
print(f"Author signal: {has_author}")
print(f"Credential signal: {has_credentials}")
