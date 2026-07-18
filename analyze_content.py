import re
import html as html_mod
import json

with open('c:/Users/Administrator/Desktop/2v2.io/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the guide article (line 157-315)
guide_start = content.find('<article class="guide-article">')
guide_end = content.find('</article>', guide_start)
guide_html = content[guide_start:guide_end]

# Strip HTML tags but preserve structure
clean = re.sub(r'<style[^>]*>.*?</style>', '', guide_html, flags=re.DOTALL)
clean = re.sub(r'<[^>]+>', ' ', clean)
clean = re.sub(r'\s+', ' ', clean).strip()
clean = html_mod.unescape(clean)

words = clean.split()
sentences = re.split(r'[.!?]+', clean)
sentences = [s.strip() for s in sentences if s.strip()]

print(f'=== GUIDE ARTICLE STATS ===')
print(f'Total words: {len(words)}')
print(f'Total sentences: {len(sentences)}')
avg_wps = len(words)/len(sentences) if sentences else 0
print(f'Avg words per sentence: {avg_wps:.1f}')

# Sentence length variety
sent_lens = [len(s.split()) for s in sentences]
print(f'Shortest sentence: {min(sent_lens)} words')
print(f'Longest sentence: {max(sent_lens)} words')

# Count em-dashes
em_dashes = clean.count('—') + clean.count('–') + clean.count('--')
print(f'Em-dashes/en-dashes: {em_dashes}')

# Count parentheticals
parentheticals = len(re.findall(r'\([^)]+\)', clean))
print(f'Parenthetical asides: {parentheticals}')

# Adjective stacking check
adj_pattern = re.findall(r'\b(\w+ly|\w+ous|\w+ive|\w+ful|\w+less|\w+able|\w+al|\w+ic|\w+ent)\s+(?:\w+ly|\w+ous|\w+ive|\w+ful|\w+less|\w+able|\w+al|\w+ic|\w+ent)', clean, re.IGNORECASE)
print(f'Adjective/adverb pairs: {len(adj_pattern)}')

# Keyword density
total = len(words)
kws = {
    'sprunki retextured': r'(?i)sprunki\s+retextured',
    'incredibox': r'(?i)incredibox',
    'music creation': r'(?i)music\s+creation',
    'sprunki': r'(?i)sprunki',
    'game': r'(?i)\bgame\b',
    'characters': r'(?i)character',
    'beat(s)': r'(?i)\bbeat(s)?\b',
    'melody/melodies': r'(?i)melod(y|ies)',
    'drag': r'(?i)\bdrag\b',
    'mix(es)': r'(?i)\bmix(es)?\b',
    'track(s)': r'(?i)\btrack(s)?\b',
    'sound(s)': r'(?i)\bsound(s)?\b',
    'unblocked': r'(?i)unblocked',
}
print()
print('=== KEYWORD DENSITY (guide article) ===')
for name, pattern in kws.items():
    matches = len(re.findall(pattern, clean))
    density = (matches / total) * 100 if total > 0 else 0
    print(f'{name}: {matches} ({density:.2f}%)')

# Repeated phrases
print()
print('=== REPEATED PHRASES ===')
repeated_checks = [
    'drag and drop', 'hidden combo', 'from the bottom bar', 'visual cue',
    'music creation game', 'fan-made', 'no download', 'drag characters',
    'no download needed', 'create your own', 'retextured character',
    'entirely new', 'community',
]
for p in repeated_checks:
    count = clean.lower().count(p.lower())
    if count >= 1:
        print(f'  "{p}": {count}x')

# Structural elements in guide
print()
print('=== STRUCTURAL ELEMENTS ===')
h2_count = guide_html.count('<h2 ')
h3_count = guide_html.count('<h3 ')
table_count = guide_html.count('<table')
list_count = guide_html.count('<ul') + guide_html.count('<ol')
p_count = guide_html.count('<p ')
img_count = guide_html.count('<img')
print(f'H2 headings: {h2_count}')
print(f'H3 headings: {h3_count}')
print(f'Tables: {table_count}')
print(f'Lists (ul+ol): {list_count}')
print(f'Paragraphs: {p_count}')
print(f'Images in guide: {img_count}')

# Generic marketing phrases
print()
print('=== GENERIC MARKETING PHRASES ===')
generics = [
    r'unlock your (full )?potential',
    r'take your .+ to the next level',
    r'unlike anything you',
    r'next.level',
    r'game.changer',
    r'cutting.edge',
    r'best.in.class',
    r'revolutionary',
    r'unprecedented',
    r'in today.s fast.paced',
    r'whether you.re a',
]
for g in generics:
    matches = re.findall(g, clean, re.IGNORECASE)
    if matches:
        print(f'  Found: {matches}')

# Flesch reading ease approximation
import math
total_syllables = 0
for w in words:
    wc = re.sub(r'[^a-zA-Z]', '', w).lower()
    if len(wc) <= 3:
        total_syllables += 1
    else:
        # rough syllable count
        vowels = len(re.findall(r'[aeiouy]+', wc))
        # subtract silent e
        if wc.endswith('e'):
            vowels = max(1, vowels - 1)
        total_syllables += max(1, vowels)

flesch = 206.835 - 1.015 * (total / len(sentences)) - 84.6 * (total_syllables / total) if sentences else 0
print(f'\\nApprox. Flesch Reading Ease: {flesch:.1f} (0-100, higher = easier)')

# Check for exclamation points (excessive = AI signal)
excl = clean.count('!')
print(f'Exclamation marks: {excl}')

# Word repetition within close proximity (keyword stuffing signal)
print()
print('=== PROXIMITY REPETITION ===')
# Check if "Sprunki" appears too close together
sprunki_positions = [m.start() for m in re.finditer(r'(?i)sprunki', clean)]
if len(sprunki_positions) > 1:
    gaps = [sprunki_positions[i+1] - sprunki_positions[i] for i in range(len(sprunki_positions)-1)]
    avg_gap_chars = sum(gaps) // len(gaps) if gaps else 0
    close_gaps = [g for g in gaps if g < 150]
    print(f'  "sprunki" instances: {len(sprunki_positions)}, avg gap: {avg_gap_chars} chars, close gaps (<150): {len(close_gaps)}')
