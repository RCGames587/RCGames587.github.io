# Editing Guide

This guide walks through the usual changes to the site: adding a page, a project, a tutorial, or an involvement, and putting code blocks, images, and other rich content inside your text.

You don't need a build step or any installs. Edit a file, refresh the browser, and push to GitHub when you're done.

---

## 0. How the site is put together

```
portfolio/
├── index.html            Home
├── about.html            About (text is written directly in this file)
├── projects.html         Projects list      ← content comes from data.js
├── tutorials.html        Tutorials list     ← content comes from data.js
├── tutorial.html         One tutorial (?id=...) ← content comes from data.js
├── involvements.html     Student orgs       ← content comes from data.js
├── 404.html              "Page not found"
├── _template.html        Starter file for a new page
├── .nojekyll             Tells GitHub Pages to serve files exactly as they are
└── assets/
    ├── css/style.css     All styling. Colors are at the top.
    ├── js/data.js        ★ ALL your content: projects, tutorials, involvements, links
    ├── js/site.js        Header, footer, navigation, and the code that renders the pages
    └── img/              Images
```

**The main rule:** content lives in `assets/js/data.js`, and the layout lives in the `.html` files and `site.js`. Most of the time you'll only edit `data.js`.

### Previewing your changes locally
From the `portfolio` folder, run:
```bash
python3 -m http.server 8000
```
Then open <http://localhost:8000>. Refresh after each save. Opening the `.html` file by double-clicking also works.

### When something breaks
`data.js` is JavaScript, so a single missing comma can blank a whole page. Open the browser DevTools (F12 → Console) and it will point to the line with the problem. The usual causes are:
- A missing comma between two `{ ... }` objects or between two properties
- A straight quote `"` inside a string that also uses `"`. Use `\"`, or switch that string to backticks `` ` ``.
- A missing `]` or `}`

---

## 1. Personal info, links, headshot, and logo

At the top of `data.js`:

```js
window.SITE = {
  name: "Trevor Cho",
  initials: "TS",                       // logo monogram
  role: "Electrical Engineering Student",
  headshot: "assets/img/headshot.jpg",  // your photo
  links: {
    linkedin: "https://www.linkedin.com/in/your-handle",
    github:   "https://github.com/your-handle",
    discord:  "https://discord.com/users/123456789012345678",
    discordHandle: "your_handle",
  },
};
```

- **Headshot:** use a square image, 600×600 or larger, and save it in `assets/img/`.
- **Discord ID:** in Discord, go to Settings → Advanced → turn on Developer Mode. Then right-click your name and choose Copy User ID.
- **Logo:** the "TS" monogram is drawn as circuit traces. It's an SVG stored in the `LOGO` constant near the top of `site.js`, and a matching copy lives in `assets/img/favicon.svg`. Each letter is one `<path>`: the first path is the T and the second is the S. The small `<circle>` elements are the solder-via dots.

---

## 2. Add a project

Open `data.js` and find `window.PROJECTS = [`. Copy an existing `{ ... },` block, paste it where you want the new project to appear (the list order is the display order), and edit it:

```js
{
  id: "line-follower",                 // unique, lowercase, no spaces
  title: "PID Line-Following Robot",
  status: "current",                   // "current" or "past"
  featured: true,                      // true = shows on the home page (the first 3 featured are used)
  date: "2026",
  image: "assets/img/line-follower.webp",
  summary: "One or two sentences about what it is and why it matters.",
  role: "Firmware + PCB design",
  stack: ["STM32", "PID control", "KiCad"],
  highlights: [
    "Tuned **PID gains** to hold the line at 1.2 m/s",   // inline formatting works here
    "Designed a 2-layer sensor PCB in KiCad",
  ],
  links: [
    { label: "Source", url: "https://github.com/you/line-follower" },
  ],
  // Optional: rich content (code, images, tables…). See section 6.
  content: [
    { type: "image", src: "assets/img/line-follower-pcb.webp", alt: "Sensor PCB", caption: "Rev B sensor board" },
  ],
},
```

You can leave `links` as an empty list `[]`. You can leave out `content` entirely.

---

## 3. Add a tutorial (and grow it into a workshop)

Find `window.TUTORIALS = [` in `data.js`, then copy and edit a block:

```js
{
  id: "op-amp-basics",                 // becomes tutorial.html?id=op-amp-basics
  title: "Op-Amp Basics: Inverting and Non-Inverting Amplifiers",
  status: "prototype",                 // "prototype" → "iterating" → "workshop-ready"
  version: "v0.1",
  level: "Intermediate",
  duration: "60 min",
  tags: ["Analog", "Op-amps"],
  summary: "Build both amplifier configurations and measure their gain.",
  objectives: ["Derive the gain of an inverting amplifier", "Measure gain with a scope"],
  materials: ["LM358 op-amp", "10 kΩ and 100 kΩ resistors", "±5 V supply"],
  steps: [
    {
      title: "Build the inverting amplifier",
      body: "Short intro text. **Bold**, `code`, and [links](https://example.com) work.",
      content: [ /* optional rich blocks: see section 6 */ ],
    },
  ],
  workshop: {
    audience: "Circuits II students",
    groupSize: "12–16, pairs",
    format: "10 min theory · 40 min build · 10 min discussion",
    facilitatorNotes: ["Check that every kit has a dual-rail supply."],
  },
  iterations: [
    { version: "v0.1", date: "2026-10", notes: "First draft." },
  ],
},
```

### Iterating on a tutorial
Each time you revise one:
1. Raise `version` (for example `v0.1` → `v0.2`).
2. Add a new entry at the **top** of `iterations` saying what changed and why, such as "students got stuck on X, so I added Y."
3. When it has been tested with people, change `status` to `"iterating"`. When it's timed and kitted, change it to `"workshop-ready"`.
4. Fill in `workshop`.

The Tutorials page updates its stage counts and progress bars on its own. Every tutorial page also has a **Print handout** button that prints a clean black-and-white version without the navigation.

---

## 4. Add an involvement (student org)

Find `window.INVOLVEMENTS = [` in `data.js`:

```js
{
  id: "tbp",
  name: "Tau Beta Pi",
  short: "TBP",                        // text shown in the logo tile if there's no logo image
  status: "current",                   // "current" or "past"
  dates: "2026 — present",
  logo: "assets/img/tbp-logo.png",     // optional; "" shows the `short` text instead
  summary: "Engineering honor society.",
  roles: [                             // newest first; the first one gets the yellow dot
    { title: "Tutoring Chair", dates: "2026 — present", notes: "Run weekly drop-in tutoring." },
    { title: "Member", dates: "2025 — 2026" },
  ],
  highlights: ["Organized 12 tutoring sessions per semester"],
  tags: ["Leadership", "Tutoring"],
  link: "https://www.tbp.org",         // optional; "" hides the link
  content: [],                         // optional rich blocks
},
```

Transparent PNG or SVG logos look best on the dark background.

---

## 5. Add a new page

Say you want a **Research** page.

### Step 1: Create the file
Copy `_template.html` to `research.html`. In the new file, change:
- the `<title>` and `<meta name="description">`
- `data-page="newpage"` → `data-page="research"`. This name is what highlights the nav link.
- the heading and content inside `<main>`

### Step 2: Add it to the navigation
In `assets/js/site.js`, find the `NAV` list and add a line:

```js
const NAV = [
  ["index.html", "Home", "home"],
  ["about.html", "About", "about"],
  ["projects.html", "Projects", "projects"],
  ["tutorials.html", "Tutorials", "tutorials"],
  ["involvements.html", "Involvements", "involvements"],
  ["research.html", "Research", "research"],   // ← new: [file, label, data-page]
];
```

The third value must match the page's `data-page`. The header and footer are added to every page automatically, so you never copy them by hand.

### Step 3 (optional): Drive the page from data
If the page lists repeated items, like the projects page does, you can keep that list in `data.js` too:

1. In `data.js`, add your list:
   ```js
   window.RESEARCH = [
     { title: "Low-power LoRa sensing", lab: "Sensors Lab", summary: "...", content: [] },
   ];
   ```
2. In `research.html`, add an empty container: `<div class="grid grid-3" data-research></div>`
3. In `site.js`, next to the other `if (page === "...")` blocks, add:
   ```js
   if (page === "research") {
     const R = window.RESEARCH || [];
     $("[data-research]").innerHTML = R.map(r => `
       <article class="card reveal"><div class="card-body">
         <div class="meta">${esc(r.lab)}</div>
         <h3>${esc(r.title)}</h3>
         <p>${inline(r.summary)}</p>
         <div class="rich">${blocks(r.content)}</div>
       </div></article>`).join("");
     observe(); bindCopy();
   }
   ```
   `esc()` makes text safe to insert, `inline()` handles **bold**, `code`, and links, and `blocks()` renders rich content (section 6).

### Step 4: Add a home page link (optional)
Add a button anywhere in `index.html`: `<a class="btn" href="research.html">Research</a>`.

### Building blocks you can reuse in HTML

| Class | What it does |
| --- | --- |
| `section` + `container` | Standard page section with side margins |
| `page-head` | Top-of-page title area |
| `label` | Small yellow mono label with a dash |
| `section-head` | Heading row, with an optional link on the right |
| `grid grid-3` | Responsive card grid |
| `card` / `card-body` / `card-media` | Cards |
| `btn`, `btn btn-primary` | Buttons (outline and solid yellow) |
| `tag`, `tags` | Small mono tags |
| `badge badge-current` / `badge-past` | Status badges |
| `prose` | Comfortable reading layout for long text |
| `panel` | Bordered side box |
| `reveal` | Fades in on scroll |

---

## 6. Rich content: code blocks, images, callouts, and more

In any **project**, **tutorial step**, or **involvement**, add a `content` list. Each item is one block, and blocks appear in order.

### Inline formatting (works in `body`, `summary`, `highlights`, `notes`, and every text block)

| You write | You get |
| --- | --- |
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `` `analogWrite()` `` | inline code |
| `[datasheet](https://…)` | a link (external links open in a new tab) |

### Block types

```js
content: [
  // Plain paragraph (a bare string works too)
  "A short paragraph with **bold** and `code`.",
  { type: "text", text: "Same thing, written out in full." },

  // Small heading inside the content
  { type: "heading", text: "Measuring the output" },

  // Code block with a Copy button
  {
    type: "code",
    lang: "C++",                         // optional label (right side)
    caption: "blink.ino",                // optional label (left side)
    code: `void setup() {
  pinMode(9, OUTPUT);
}`,
  },

  // Image
  {
    type: "image",
    src: "assets/img/scope-capture.webp",
    alt: "Scope trace showing a 50% duty cycle",   // always describe the image
    caption: "PWM at 50% duty cycle",              // optional
  },

  // Callout box: tone is "tip" (yellow), "warning" (orange), or "info" (blue)
  { type: "callout", tone: "warning", title: "Hot!", text: "The regulator can get hot above 500 mA." },

  // Bulleted or numbered list
  { type: "list", ordered: true, items: ["Power off", "Wire the circuit", "Power on"] },

  // Table
  {
    type: "table",
    headers: ["Resistor", "Color bands", "Use"],
    rows: [
      ["220 Ω", "red-red-brown", "LED current limit"],
      ["10 kΩ", "brown-black-orange", "Pull-up"],
    ],
  },

  // YouTube video (use the ID after "watch?v=")
  { type: "video", youtube: "dQw4w9WgXcQ", title: "Soldering demo" },

  // Escape hatch: your own raw HTML
  { type: "html", html: "<p>Anything <sup>custom</sup></p>" },
],
```

A working example is in the **"Wire the circuit"** step of the Blink-to-PWM tutorial in `data.js`. It has an image, a warning callout, and a table.

### Code block tips
- Wrap the code in **backticks** `` ` ``. That lets it span multiple lines and contain `"` quotes.
- If your code itself contains a backtick or `${`, write them as `` \` `` and `\${`.
- Tutorial steps can also use the shorter `code: \`...\`` property directly on the step. That's the same as a code block with no labels.

### Image tips
1. Put images in `assets/img/`. Subfolders are fine, such as `assets/img/tutorials/`.
2. Keep them under about 300 KB. Convert to WebP with any online converter, or with Python:
   ```bash
   python3 -c "from PIL import Image; im=Image.open('photo.jpg'); im.thumbnail((1600,1600)); im.save('photo.webp', quality=80)"
   ```
3. Paths are **relative with no leading slash**: `assets/img/photo.webp`, not `/assets/img/photo.webp`. This keeps images working whether the site lives at `username.github.io` or `username.github.io/repo-name`.
4. File names on GitHub Pages are **case-sensitive**: `Photo.JPG` and `photo.jpg` are different files.

### Code and images in hand-written HTML pages
On pages like `about.html` or a new page, use the same markup the blocks produce:

```html
<figure class="code">
  <figcaption class="code-head"><span>main.c</span><span>C</span></figcaption>
  <button class="copy" type="button">Copy</button>
  <pre><code>if (x &lt; 5) { return 1; }</code></pre>
</figure>

<figure class="block-img">
  <img src="assets/img/photo.webp" alt="Describe it">
  <figcaption>Caption</figcaption>
</figure>

<aside class="callout callout-tip"><strong>Tip</strong><p>Text here.</p></aside>
```

In raw HTML, write `<` as `&lt;` and `&` as `&amp;` inside code.

---

## 7. Colors and fonts

At the top of `assets/css/style.css`:

```css
:root, [data-theme="dark"] {
  --bg: #08111f;        /* page background (dark navy) */
  --surface: #0f1d35;   /* cards */
  --accent: #ffd23f;    /* bright yellow */
  ...
}
[data-theme="light"] { ... }   /* light-mode versions */
```

Fonts load in the `<head>` of each HTML file: Cabinet Grotesk for headings, Satoshi for body text, and JetBrains Mono for labels and code.

---

## 8. Publishing updates

```bash
git add .
git commit -m "Add op-amp tutorial"
git push
```

GitHub Pages redeploys within about a minute. If the old version still shows, do a hard refresh with Ctrl+Shift+R.
