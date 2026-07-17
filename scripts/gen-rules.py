"""Generate data/core-rules.js and data/tournament-rules.js from extracted PDF text.

Usage:
  1. Extract PDF text, one file per document, pages separated by '=== PAGE N ===':
       python -c "
       from pypdf import PdfReader
       r = PdfReader('Riftbound Core Rules RUPX.pdf')
       print('\n'.join(f'=== PAGE {i+1} ===\n' + (p.extract_text() or '') for i,p in enumerate(r.pages)))
       " > core.txt
  2. Edit CORE_SECTIONS / TOURN_SECTIONS below if the new doc renumbered sections
     (candidates: grep -E '^[0-9]{3}\\.\\s' core.txt | awk 'length($0) < 75').
  3. Update version/lastUpdated metadata in the emit() calls at the bottom.
  4. Run: python scripts/gen-rules.py core.txt tournament.txt
  5. If the Keywords section number changed, update getKeywords() in app.js.
"""
import re, json, io, os, sys

OUT = os.path.join(os.path.dirname(__file__), "..", "data")

LIG = {"ﬁ":"fi","ﬂ":"fl","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl",
       "’":"'","‘":"'","“":'"',"”":'"'," ":" "}

RULE_RE = re.compile(r"^(\d{3}(?:\.(?:\d+|[a-z]+))*)\.(\s+.*|\s*)$")

def norm(s):
    for k,v in LIG.items(): s = s.replace(k,v)
    s = re.sub(r"\s+"," ",s).strip()
    s = re.sub(r"\s+([,.;:!?)\]])", r"\1", s)
    s = re.sub(r'([(\[])\s+', r"\1", s)
    s = re.sub(r'(\s)" (\w)', r'\1"\2', s)
    return s

def parse(path):
    rules = []
    started = False
    with io.open(path, encoding="utf-8") as f:
        for raw in f:
            line = raw.rstrip("\n")
            if line.startswith("=== PAGE"): continue
            if not line.strip(): continue
            m = RULE_RE.match(line)
            if m:
                started = True
                rules.append([m.group(1), m.group(2)])
            elif started and rules:
                rules[-1][1] += " " + line
    return [(num, norm(txt)) for num, txt in rules]

def is_header(num, txt):
    return "." not in num and len(txt) <= 45 and txt and not txt.endswith(".")

LABEL_RE = re.compile(r"^((?:[A-Za-z][\w'&()./-]*\s){0,4}[A-Za-z][\w'&()./-]*):(?=\s)")
def boldlabel(txt):
    m = LABEL_RE.match(txt)
    if m and len(m.group(1)) <= 45:
        return f"**{m.group(1)}**:" + txt[m.end():]
    return txt

PENALTY_RE = re.compile(r"^([A-Z][^:\[\]]{2,60}?)\s*\[([^\]]{2,30})\]\s*:")
def boldpenalty(txt):
    m = PENALTY_RE.match(txt)
    if m:
        return f"**{m.group(1).strip()} [{m.group(2).strip()}]**:" + txt[m.end():]
    return txt

def build(rules, sections_def, meta):
    starts = sorted([s for s,_ in sections_def])
    titles = dict(sections_def)
    secs, cur = [], None
    for num, txt in rules:
        top = int(num.split(".")[0])
        sec_start = max([s for s in starts if s <= top], default=None)
        if sec_start is None: continue
        if cur is None or cur["_start"] != sec_start:
            cur = {"_start": sec_start,
                   "num": f"{sec_start:03d}",
                   "title": titles[sec_start], "rules": []}
            secs.append(cur)
        if txt == titles[sec_start] and f"{top:03d}" == cur["num"] and "." not in num:
            continue  # skip the bare section header rule itself
        if is_header(num, txt):
            t = f"**{txt}**"
        else:
            t = boldpenalty(txt) if (meta.get("_penalties") and top >= 700) else txt
            if t == txt:
                t = boldlabel(txt)
        cur["rules"].append({"num": num, "text": t})
    for s in secs: del s["_start"]
    secs = [s for s in secs if s["rules"]]
    return {**meta, "sections": secs}

# RUP4 (2026-07-16) section map — update on renumbering
CORE_SECTIONS = [
 (0,"Golden and Silver Rules"),(100,"Game Concepts"),(104,"Setup"),
 (119,"Game Objects"),(125,"Cards"),(140,"Units"),(147,"Gear"),(153,"Spells"),
 (160,"Runes"),(169,"Battlefields"),(173,"Legends"),(179,"Tokens"),
 (188,"Control"),(193,"Winning"),(197,"Locations"),(201,"Costs"),
 (300,"Playing the Game"),(314,"Phases of the Turn"),(318,"Cleanups"),
 (325,"Chains and Showdowns"),(349,"Playing Cards"),(353,"The Process of Play"),
 (360,"Abilities"),(367,"Replacement Effects"),(376,"Activated Abilities"),
 (382,"Triggered Abilities"),(386,"Reflexive Triggers"),(389,"Delayed Abilities"),
 (393,"Linked Abilities"),(398,"Playing or Activating Abilities"),
 (407,"Game Actions"),(413,"Draw"),(414,"Exhaust"),(415,"Ready"),(416,"Recycle"),
 (417,"Deal"),(418,"Heal"),(419,"Play"),(420,"Move"),(421,"Hide"),(422,"Discard"),
 (423,"Stun"),(424,"Reveal"),(425,"Counter"),(426,"Buff"),(427,"Banish"),
 (428,"Kill"),(429,"Add"),(430,"Channel"),(431,"Burn Out"),
 (432,"Double, Swap, Attach, Detach"),(436,"Predict, Prevent, Replace, Create"),
 (440,"Burn, Empower, Disempower, Skip, Pay"),
 (445,"Movement"),(454,"Recalls"),(459,"Combat"),(467,"Scoring"),(473,"Layers"),
 (481,"Modes of Play"),(649,"Conceding"),(700,"Additional Rules"),
 (726,"Dependent Keywords"),(728,"XP"),(734,"Additional Turns"),
 (739,"Special Terms"),(800,"Keywords"),
]

TOURN_SECTIONS = [
 (0,"Golden Rule"),(100,"Introduction"),(200,"Definitions"),(300,"Eligibility"),
 (400,"Policies"),(500,"Communication"),(509,"Gameplay Decisions"),
 (600,"Competition Formats"),(602,"Limited"),(603,"2v2"),
 (604,"Event and Round Time Limits"),(700,"Enforcement and Penalties"),
 (701,"General"),(702,"Game Play Errors"),(703,"Tournament Errors"),
 (704,"Unsporting Conduct"),(705,"Disciplinary Code"),
]

def emit(src, sections, meta, varname, outfile, header):
    rules = parse(src)
    data = build(rules, sections, meta); data.pop("_penalties", None)
    print(f"--- {outfile}: {len(rules)} rules, {len(data['sections'])} sections")
    for s in data["sections"]:
        print(" ", s["num"], s["title"], len(s["rules"]))
    out = header + f"\nconst {varname} = " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"
    with io.open(os.path.join(OUT, outfile), "w", encoding="utf-8") as f:
        f.write(out)

emit(sys.argv[1], CORE_SECTIONS,
     {"title":"Riftbound Core Rules","lastUpdated":"2026-07-16","version":"RUP4"},
     "CORE_RULES_DATA", "core-rules.js",
     "// Riftbound Core Rules Data (RUP4, Last Updated: 2026-07-16)\n// Generated by scripts/gen-rules.py from the official Core Rules PDF.")

emit(sys.argv[2], TOURN_SECTIONS,
     {"title":"Riftbound Tournament Rules","lastUpdated":"2026-07-16","version":"RUP4","_penalties":True},
     "TOURNAMENT_RULES_DATA", "tournament-rules.js",
     "// Riftbound Tournament Rules Data (RUP4, Last Updated: 2026-07-16)\n// Generated by scripts/gen-rules.py from the official Tournament Rules PDF.")
