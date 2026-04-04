#!/usr/bin/env python3
"""Fetch Riftbound card data from the official site for the Judge app."""

import re
import json
import requests
from pathlib import Path

BASE_URL = "https://riftbound.leagueoflegends.com"
GALLERY_PATH = "/en-us/card-gallery/"

session = requests.Session()
session.headers.update({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
})

# Fetch the page HTML — card data is embedded in a big inline script
print("Fetching card gallery page...")
html = session.get(f"{BASE_URL}{GALLERY_PATH}").text

# Find the large script containing the Next.js props
scripts = re.findall(r'<script[^>]*>(.+?)</script>', html, re.DOTALL)
big = [sc for sc in scripts if len(sc) > 500000]
if not big:
    raise ValueError("Could not find card data script in page HTML")

data = json.loads(big[0])
cards_raw = data['props']['pageProps']['page']['blades'][2]['cards']['items']
print(f"Found {len(cards_raw)} cards")

def clean_html(html_str):
    if not html_str:
        return ''
    text = re.sub(r'<br\s*/?>', '\n', html_str)
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()

def simplify(card):
    c = {}
    c['id'] = card.get('id', '')
    c['name'] = card.get('name', '')
    c['code'] = card.get('publicCode', '')

    # Set
    s = card.get('set', {})
    c['set'] = s.get('value', {}).get('label', '') if isinstance(s, dict) else ''

    # Domain(s)
    dom = card.get('domain', {})
    if isinstance(dom, dict):
        vals = dom.get('values', [])
        c['domains'] = [v.get('label', '') for v in vals if isinstance(v, dict)]
    else:
        c['domains'] = []

    # Rarity
    r = card.get('rarity', {})
    c['rarity'] = r.get('value', {}).get('label', '') if isinstance(r, dict) else ''

    # Card type + supertypes
    ct = card.get('cardType', {})
    if isinstance(ct, dict):
        types = ct.get('type', [])
        c['type'] = types[0].get('label', '') if types else ''
        supers = ct.get('superType', [])
        if supers:
            c['supertypes'] = [st.get('label', '') for st in supers]

    # Energy cost
    e = card.get('energy', {})
    if isinstance(e, dict) and e.get('value'):
        c['energy'] = e['value'].get('id', '')

    # Might
    m = card.get('might', {})
    if isinstance(m, dict) and m.get('value'):
        c['might'] = m['value'].get('id', '')

    # Power cost
    p = card.get('power', {})
    if isinstance(p, dict) and p.get('value'):
        c['power'] = p['value'].get('id', '')

    # Tags
    tags = card.get('tags', {})
    if isinstance(tags, dict):
        c['tags'] = [t.get('label', t) if isinstance(t, dict) else t
                     for t in tags.get('tags', [])]

    # Ability text
    text = card.get('text', {})
    if isinstance(text, dict):
        rich = text.get('richText', {})
        if isinstance(rich, dict):
            c['text'] = clean_html(rich.get('body', ''))

    return c

cards = [simplify(c) for c in cards_raw]
# Remove empty optional fields
for c in cards:
    for k in list(c.keys()):
        if c[k] == '' or c[k] == [] or c[k] is None:
            if k not in ('name', 'id'):
                del c[k]

cards.sort(key=lambda c: (c.get('set', ''), c.get('name', '')))

out = Path(__file__).parent.parent / 'data' / 'cards.json'
with open(out, 'w', encoding='utf-8') as f:
    json.dump(cards, f, indent=2, ensure_ascii=False)

print(f"Saved {len(cards)} cards to {out}")
print(f"File size: {out.stat().st_size / 1024:.0f} KB")

# Summary
sets = {}
types = {}
for c in cards:
    s = c.get('set', '?')
    t = c.get('type', '?')
    sets[s] = sets.get(s, 0) + 1
    types[t] = types.get(t, 0) + 1

print("\nBy set:")
for s, n in sorted(sets.items()):
    print(f"  {s}: {n}")
print("\nBy type:")
for t, n in sorted(types.items()):
    print(f"  {t}: {n}")
