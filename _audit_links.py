import re
# Check index.html for game links
with open('c:/Users/Administrator/Desktop/2v2.io/index.html', 'r', encoding='utf-8') as f:
    html = f.read()
for game in ['sprunki-pvz', 'corruptbox', 'phase-16']:
    links = re.findall(r'href=["\'][^"\']*' + game + r'[^"\']*["\']', html)
    print(f'Index links to {game}: {len(links)} - {links}')

# Check games.html
print('---')
with open('c:/Users/Administrator/Desktop/2v2.io/games.html', 'r', encoding='utf-8') as f:
    html = f.read()
for game in ['sprunki-pvz', 'corruptbox', 'phase-16']:
    links = re.findall(r'href=["\'][^"\']*' + game + r'[^"\']*["\']', html)
    print(f'Games page links to {game}: {len(links)} - {links}')

# Article body word count for sprunki-pvz
print('---')
with open('c:/Users/Administrator/Desktop/2v2.io/games/sprunki-pvz.html', 'r', encoding='utf-8') as f:
    html = f.read()
m = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL)
if m:
    clean = re.sub(r'<[^>]+>', ' ', m.group(1))
    clean = re.sub(r'\s+', ' ', clean).strip()
    print(f'Article body words: {len(clean.split())}')

# Internal links from sprunki-pvz
links = re.findall(r'href="(\.\.[^"]*)"', html)
print(f'Internal relative links: {links}')

# Check if about-us or contact-us are linked
has_about = 'about-us' in html
has_contact = 'contact-us' in html
has_mailto = 'mailto:' in html
print(f'Links to about-us: {has_about}')
print(f'Links to contact-us: {has_contact}')
print(f'Has mailto link: {has_mailto}')
