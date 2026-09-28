# English Reading Notes

Technical-English reading notes generated from GitHub repositories, published with
[MkDocs](https://www.mkdocs.org/) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

The site is built from Markdown only — no Node.js, no database, no runtime services.

## Repository layout

```text
.
├── .github/workflows/pages.yml   # build + deploy to GitHub Pages
├── docs/
│   ├── index.md                  # landing page
│   ├── readings/
│   │   ├── index.md              # introduction to the archive
│   │   └── YYYY/MM/<repo>.md     # one reading note per repository
│   └── assets/stylesheets/extra.css
├── mkdocs.yml
└── requirements.txt
```

## Local preview

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r requirements.txt
mkdocs serve
```

The site is then available at <http://127.0.0.1:8000>.

To reproduce exactly what CI builds:

```bash
mkdocs build --strict
```

## Adding a reading note

Create a Markdown file at:

```text
docs/readings/YYYY/MM/<repository-name>.md
```

`YYYY` and `MM` are the year and month in which the repository was read. Nothing else has
to be edited: the navigation is generated from the `docs/` tree, so a new file becomes a
new navigation entry on the next build. Start each note with a single `# Heading` — that
heading becomes its title in the navigation.

## Deployment

`.github/workflows/pages.yml` runs on every push to `main` (and can be started manually
through *Actions → pages → Run workflow*). It installs `requirements.txt`, runs
`mkdocs build --strict`, uploads the generated `site/` directory as a Pages artifact and
deploys it to the `github-pages` environment. No `gh-pages` branch is created and no
repository secrets are required.
