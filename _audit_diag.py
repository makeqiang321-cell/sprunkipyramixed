import re

with open('c:/Users/Administrator/Desktop/2v2.io/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Broken button tags
for pattern in ["'/button>"]:
    c = html.count(pattern)
    if c > 0:
        print("Pattern %s found: %dx (should be </button>)" % (pattern, c))

# Google Fonts URL check
m = re.search(r'css2(.?)family=', html)
if m:
    char = m.group(1)
    print("Google Fonts URL separator: U+%04X ('%s') - should be ? (U+003F)" % (ord(char), char))

# Hidden display:none sections
hidden = len(re.findall(r'style="display:none"', html))
print("Hidden sections (display:none): %d" % hidden)

# Empty reviews/comments
if 'Be the first to review' in html:
    print("Star rating: empty (no reviews)")

# Meta description
m = re.search(r'<meta name="description" content="([^"]+)"', html)
if m:
    desc = m.group(1)
    print("Meta description length: %d chars" % len(desc))

# External links
ext_links = re.findall(r'<a[^>]*href="(https?://[^"]+)"', html)
print("\nExternal links (%d):" % len(ext_links))
for link in ext_links:
    print("  %s" % link[:100])

# Schema types
for t in ['WebPage', 'VideoGame', 'Article', 'HowTo', 'FAQPage', 'WebSite', 'BreadcrumbList']:
    print("Schema %s: %s" % (t, 'YES' if t in html else 'NO'))

# Author
has_person = 'Person' in html
print("\nAuthor schema (Person): %s" % has_person)
date_m = re.search(r'"dateModified": "([^"]+)"', html)
if date_m:
    print("Schema dateModified: %s" % date_m.group(1))
visible_date = 'Published' in html or 'Updated' in html
print("Visible publish/update date on page: %s" % visible_date)

# OG image
og_m = re.search(r'og:image" content="([^"]+)"', html)
if og_m:
    print("OG Image URL: %s" % og_m.group(1))

# Nofollow
nofl = len(re.findall(r'rel="nofollow"', html))
print("Nofollow rels: %d" % nofl)

# Check for actual comments rendered
cl = html.split('id="commentList"')[1].split('</div>')[0] if 'id="commentList"' in html else ''
print("Comment list has content: %s" % (len(cl.strip()) > 100))

# Language
print("lang attribute: %s" % (re.search(r'<html[^>]*lang="([^"]+)"', html).group(1) if re.search(r'<html[^>]*lang="([^"]+)"', html) else 'MISSING'))
