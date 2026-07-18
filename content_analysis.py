import re
import html as html_mod
from collections import Counter

with open('c:/Users/Administrator/Desktop/2v2.io/page_fetch.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

# Extract the info-tabs section
start = html_content.find('<section id="info-tabs"')
end = html_content.find('<!-- Ready to Play Section')
if end == -1:
    end = html_content.find('<footer')
if end == -1:
    end = len(html_content)
section_html = html_content[start:end]

# Strip HTML tags
clean = re.sub(r'<style[^>]*>.*?</style>', '', section_html, flags=re.DOTALL)
clean = re.sub(r'<script[^>]*>.*?</script>', '', clean, flags=re.DOTALL)
clean = re.sub(r'<[^>]+>', ' ', clean)
clean = re.sub(r'&[a-z]+;', ' ', clean)
clean = re.sub(r'\s+', ' ', clean).strip()
clean = html_mod.unescape(clean)

words = clean.split()
sentences_raw = re.split(r'(?<=[.!?])\s+', clean)
sentences = [s.strip() for s in sentences_raw if len(s.strip().split()) > 3]

print('=== TAB SECTION CONTENT ANALYSIS ===')
print(f'Total words: {len(words)}')
print(f'Total sentences: {len(sentences)}')
avg_wps = len(words)/len(sentences) if sentences else 0
print(f'Avg words per sentence: {avg_wps:.1f}')

# Sentence length distribution
lengths = sorted([len(s.split()) for s in sentences])
print(f'Sentence length range: {lengths[0]}-{lengths[-1]} words')
print(f'Median sentence length: {lengths[len(lengths)//2]} words')

# First-word analysis of sentences
first_words = []
for s in sentences:
    w = s.strip().split()[0] if s.strip().split() else ''
    w = w.strip('"\'.,;:()[]')
    first_words.append(w.lower())

fw = Counter(first_words)
print()
print('=== SENTENCE STARTERS (first word of each sentence) ===')
for word, count in fw.most_common(25):
    pct = (count/len(sentences))*100
    print(f'  "{word}" -> {count}x ({pct:.1f}%)')

# Dominant verbs
print()
print('=== DOMINANT VERBS ===')
verb_set = {
    'is', 'are', 'was', 'were', 'has', 'have', 'had', 'will', 'can', 'must',
    'offers', 'features', 'includes', 'allows', 'lets', 'provides', 'gives',
    'enter', 'discover', 'explore', 'experience', 'join', 'find', 'create',
    'combine', 'apply', 'recognize', 'identify', 'shape', 'immerse', 'watch',
    'fine-tune', 'administer', 'perfect', 'step', 'play', 'make', 'blend',
    'reimagines', 'transforms', 'stands', 'emerged', 'focused',
    'adds', 'keep', 'need', 'restore', 'seeking', 'share', 'connect',
    'makes', 'feels', 'looks', 'brings', 'delivers', 'ensures', 'helps',
    'contribute', 'counteract', 'see', 'turns', 'welcomes', 'represents',
    'offering', 'allowing', 'transforming', 'creating', 'providing',
    'discovering', 'working', 'restoring', 'helping', 'shaping'
}
verb_counter = Counter()
for s in sentences:
    sw = s.lower().split()
    for i, w in enumerate(sw):
        wc = w.strip('"\'.,;:()[]')
        if wc in verb_set:
            verb_counter[wc] += 1
            break

for verb, count in verb_counter.most_common(30):
    pct = (count/len(sentences))*100
    print(f'  "{verb}" -> {count}x ({pct:.1f}%)')

# Keyword density in tab content
print()
print('=== KEYWORD DENSITY (info-tabs section) ===')
total = len(words)
target_phrase = 'heal infected sprunkies'
count = clean.lower().count(target_phrase)
kw_words = 3
density = (count * kw_words / total) * 100 if total > 0 else 0
print(f'  "heal infected sprunkies" (exact): {count}x, density: {density:.2f}% (likely over-optimized if >2%)')

for kw in ['heal infected', 'therapeutic', 'healing', 'rescue', 'restore', 'restoration',
           'redemption', 'redemptive', 'vaccine', 'corrupted', 'rhythm', 'musical',
           'compassionate', 'intervention', 'incredibox', 'sprunki']:
    matches = len(re.findall(r'(?i)' + re.escape(kw), clean))
    kw_wc = len(kw.split())
    dens = (matches * kw_wc / total) * 100 if total > 0 else 0
    print(f'  "{kw}": {matches}x (density: {dens:.2f}%)')

# Generic phrase check
print()
print('=== GENERIC/AI-SIGNAL PHRASES ===')
generic_list = [
    'where rhythm meets', 'therapeutic world', 'emotional', 'compassionate',
    'whether you', 'join the', 'step into', 'discover the', 'experience the',
    'unique', 'innovative', 'transform', 'immersion',
    'blend of', 'meaningful', 'rewarding', 'satisfying', 'engaging',
    'dive into', 'unleash your', 'in the world of', 'take your',
    'looking for', 'perfect for', 'ultimate', 'truly',
    'carefully designed', 'carefully crafted'
]
found_generics = []
for g in generic_list:
    matches = list(re.finditer(r'(?i)' + re.escape(g), clean))
    if matches:
        found_generics.append((g, len(matches)))

for g, cnt in sorted(found_generics, key=lambda x: -x[1]):
    print(f'  "{g}": {cnt}x')

# Pronoun usage analysis
print()
print('=== PRONOUN/POV ANALYSIS ===')
for pro in ['you', 'your', 'we', 'our', 'i', 'my', 'they', 'their']:
    c = len(re.findall(r'(?i)\b' + pro + r'\b', clean))
    print(f'  "{pro}": {c}x')

# Reading ease
total_syllables = 0
for w in words:
    wc = re.sub(r'[^a-zA-Z]', '', w).lower()
    if len(wc) <= 3:
        total_syllables += 1
    else:
        vowels = len(re.findall(r'[aeiouy]+', wc))
        if wc.endswith('e'):
            vowels = max(1, vowels - 1)
        total_syllables += max(1, vowels)

avg_spw = total_syllables / total if total > 0 else 0
flesch = 206.835 - 1.015 * avg_wps - 84.6 * avg_spw if sentences else 0
fk_grade = 0.39 * avg_wps + 11.8 * avg_spw - 15.59
print(f'\nFlesch Reading Ease: {flesch:.1f} (0-100, higher=easier, 60-70=plain English)')
print(f'Flesch-Kincaid Grade Level: {fk_grade:.1f}')

excl = clean.count('!')
print(f'Exclamation marks: {excl}')

# Repeated trigrams
print()
print('=== REPEATED TRIGRAMS (>2 occurrences) ===')
ws = clean.lower().split()
trigrams = []
for i in range(len(ws)-2):
    trigrams.append(' '.join(ws[i:i+3]))
trigram_counts = Counter(trigrams)
for tri, count in trigram_counts.most_common(40):
    if count > 1:
        print(f'  "{tri}" -> {count}x')

# Check for sentence-start diversity
print()
print('=== SENTENCE STRUCTURE VARIETY ===')
# Count sentences starting with same pattern
heal_starters = sum(1 for s in sentences if s.lower().startswith('heal infected'))
the_starters = sum(1 for s in sentences if s.lower().startswith('the'))
in_starters = sum(1 for s in sentences if s.lower().startswith('in'))
enter_starters = sum(1 for s in sentences if s.lower().startswith('enter'))
whether_starters = sum(1 for s in sentences if s.lower().startswith('whether'))
join_starters = sum(1 for s in sentences if s.lower().startswith('join'))

print(f'  Starting with "Heal Infected": {heal_starters}x')
print(f'  Starting with "The": {the_starters}x')
print(f'  Starting with "In": {in_starters}x')
print(f'  Starting with "Enter": {enter_starters}x')
print(f'  Starting with "Whether": {whether_starters}x')
print(f'  Starting with "Join": {join_starters}x')
