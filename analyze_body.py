import re
from collections import Counter

with open(r'c:\Users\Administrator\Desktop\2v2.io\games\corruptbox.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract article body
m = re.search(r'<article.*?</article>', content, re.DOTALL)
if m:
    text = m.group()
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'&amp;', '&', text)
    text = re.sub(r'\s+', ' ', text).strip()
else:
    text = ''

words = text.split()
print(f'Article body word count: {len(words)}')

# Keyword mentions
kw = len(re.findall(r'Sprunki Corruptbox', text))
print(f'"Sprunki Corruptbox" mentions in body: {kw}')

print(f'"24" mentions: {len(re.findall(r"24", text))}')
print(f'"distortion" mentions: {len(re.findall(r"distortion", text, re.I))}')
print(f'"corrupted" mentions: {len(re.findall(r"corrupted", text, re.I))}')
print(f'"glitch" mentions: {len(re.findall(r"glitch", text, re.I))}')
print(f'"drag-and-drop" mentions: {len(re.findall(r"drag.and.drop", text))}')

# Sentences
sentences = re.split(r'[.!?]+', text)
sentences = [s.strip() for s in sentences if s.strip()]
print(f'Sentences: {len(sentences)}')
if sentences:
    avg = sum(len(s.split()) for s in sentences) / len(sentences)
    print(f'Avg sentence length (words): {avg:.1f}')

# 3-gram duplicates
ngrams = []
for s in sentences:
    ws = s.split()
    for i in range(len(ws)-2):
        ngrams.append(' '.join(ws[i:i+3]))
ngram_counts = Counter(ngrams)
dupes = {k: v for k, v in ngram_counts.items() if v >= 3}
print(f'\n3-word phrases repeated >=3x:')
for phrase, count in sorted(dupes.items(), key=lambda x: -x[1]):
    print(f'  "{phrase}" -> {count}x')

# Sentence starters
starters = Counter()
for s in sentences:
    fw = s.split()[0] if s.split() else ''
    starters[fw] += 1
print(f'\nMost common sentence starters (>=2x):')
for word, count in starters.most_common(15):
    if count >= 2:
        print(f'  "{word}" -> {count}x')

# 2-gram duplicates (for broader phrase matching)
bigrams = []
for s in sentences:
    ws = s.split()
    for i in range(len(ws)-1):
        bigrams.append(' '.join(ws[i:i+2]))
bigram_counts = Counter(bigrams)
bigram_dupes = {k: v for k, v in bigram_counts.items() if v >= 4}
print(f'\n2-word phrases repeated >=4x:')
for phrase, count in sorted(bigram_dupes.items(), key=lambda x: -x[1]):
    print(f'  "{phrase}" -> {count}x')

# Flesch Reading Ease
def count_syllables(word):
    word = word.lower().strip('.,;:!?()[]"\'')
    if len(word) <= 3:
        return 1
    vowels = 'aeiouy'
    count = 0
    prev_vowel = False
    for ch in word:
        if ch in vowels:
            if not prev_vowel:
                count += 1
                prev_vowel = True
        else:
            prev_vowel = False
    if word.endswith('e') and count > 1:
        count -= 1
    return max(1, count)

total_syllables = 0
total_words = 0
for s in sentences:
    ws = s.split()
    total_words += len(ws)
    for w in ws:
        total_syllables += count_syllables(w)

total_sentences = len(sentences)
if total_words > 0 and total_sentences > 0:
    flesch = 206.835 - 1.015 * (total_words / total_sentences) - 84.6 * (total_syllables / total_words)
    print(f'\nFlesch Reading Ease: {flesch:.1f}')
    if flesch >= 90:
        level = '5th grade / Very Easy'
    elif flesch >= 80:
        level = '6th grade / Easy'
    elif flesch >= 70:
        level = '7th grade / Fairly Easy'
    elif flesch >= 60:
        level = '8th-9th grade / Standard'
    elif flesch >= 50:
        level = '10th-12th grade / Fairly Difficult'
    elif flesch >= 30:
        level = 'College / Difficult'
    else:
        level = 'College graduate / Very Difficult'
    print(f'Reading level: {level}')

# Section-by-section duplication check
sections_raw = re.findall(r'<h2[^>]*>([^<]*)</h2>(.*?)(?=<h2|<h3|$)', text, re.DOTALL)
print(f'\nSection lengths (words):')
for heading, body in sections_raw:
    body_clean = re.sub(r'<[^>]+>', ' ', body)
    body_clean = re.sub(r'\s+', ' ', body_clean).strip()
    wc = len(body_clean.split()) if body_clean else 0
    print(f'  "{heading}": {wc} words')

# Overlapping phrases between sections
print('\nCommon info repeated across sections:')
# Check "24 icons" / "24 corrupted" pattern
for s in sentences:
    if '24' in s and ('icon' in s.lower() or 'sound' in s.lower()):
        print(f'  [24-icon/sound ref] {s[:100]}...')
