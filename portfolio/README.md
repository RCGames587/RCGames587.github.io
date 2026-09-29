# Trevor Cho — Electrical Engineering Portfolio

A static, dependency-free portfolio site that's ready for GitHub Pages. It's plain HTML, CSS, and JavaScript with no build step.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home: headshot, LinkedIn, GitHub, and Discord links, featured projects, latest tutorials |
| `about.html` | Bio, skills, experience and education |
| `projects.html` | Current and past projects, with filters |
| `tutorials.html` | Tutorials grouped by stage: Prototype → Iterating → Workshop-ready |
| `involvements.html` | Student organizations, roles, and leadership |
| `tutorial.html?id=<id>` | One tutorial: objectives, steps, code, workshop plan, iteration log, and a printable handout |

## Editing content

**See [EDITING-GUIDE.md](EDITING-GUIDE.md)** for a step-by-step walkthrough: adding pages, projects, tutorials, and involvements, and inserting code blocks, images, callouts, and tables into your text.

Almost everything is in **`assets/js/data.js`**:

- `SITE`: your name, tagline, email, headshot path, and your LinkedIn, GitHub, and Discord URLs
- `PROJECTS`: add an object to add a project (`status: "current"` or `"past"`; `featured: true` shows it on the home page)
- `INVOLVEMENTS`: student organizations and roles
- `TUTORIALS`: add an object to add a tutorial. As you improve it:
  1. Bump `version` (for example `v0.2` → `v0.3`)
  2. Add an entry to the top of `iterations` describing what changed and why
  3. Move `status` from `prototype` → `iterating` → `workshop-ready`
  4. Fill in `workshop` (audience, group size, timing, facilitator notes)

The About page text is in `about.html`.

### Headshot
Put a square photo (600×600 or larger) in `assets/img/`, for example `assets/img/headshot.jpg`, then set `SITE.headshot = "assets/img/headshot.jpg"`.

### Discord link
Turn on Developer Mode in Discord (Settings → Advanced), right-click your name, and choose Copy User ID. Your link is then `https://discord.com/users/<ID>`.

## Deploying to GitHub Pages

1. Create a repo. Name it `<your-username>.github.io` if you want the site at the root URL.
2. Push these files to the root of the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment**, set Source to **Deploy from a branch**, and choose `main` / `(root)`.
4. The site goes live at `https://<your-username>.github.io/` (or `/<repo>/`) within a minute or two.

The `.nojekyll` file tells GitHub Pages to serve the files exactly as they are. All links are relative, so the site works both at the root URL and at a project sub-path.

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Theme
The colors are CSS variables at the top of `assets/css/style.css`. The default theme is dark navy (`--bg`) with a yellow accent (`--accent`), and there's also a light mode toggle.
