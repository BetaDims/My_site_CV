# Franko Sanchez — Portfolio & CV

Personal portfolio website for **Franko Dimitrios Sanchez Betancourt** — Mechanical
Engineer & Data Analyst. A static site bridging field infrastructure work, data
analytics, and Python automation.

## Structure

```
index.html        # Home: hero, selected work, experience, skills, education, contact
styles.css        # All styles (themeable via CSS variables)
site.js           # Interactions: theme toggle, scroll reveals, experience tabs
projects/         # Individual project case-study pages
images/           # Photos & screenshots (see images/README.txt for filenames)
```

## Adding images

The site renders styled placeholders until you drop in matching photos. See
[`images/README.txt`](images/README.txt) for the exact filenames each spot expects —
no code changes needed once a file is in place.

## Running locally

It's a plain static site — open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
