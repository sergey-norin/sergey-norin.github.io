# Sergey Norin: personal website

Static site (plain HTML and CSS, no build step) published with GitHub Pages.

- Public website: <https://snorin239.github.io/>
- Source repository: <https://github.com/snorin239/snorin239.github.io>
- Original McGill website: <https://www.math.mcgill.ca/snorin/>

```
index.html             Home: about, contact, Barbados workshops, past teaching
students.html          Current and former students
publications.html      Papers and preprints, by topic (written in the file) or by year (built by JS)
cv.pdf                 CV, compiled from Norin_CV_2026.tex with XeLaTeX
assets/css/style.css   All styling (colours and fonts follow the CV)
assets/js/publications.js   "By topic / By year" switch and the paper counts
assets/fonts/          Libertinus Serif and Source Sans (as "SN Sans") web subsets, OFL
assets/favicon.svg
.nojekyll              Tells GitHub Pages to serve the files as they are
```

## Preview locally

Double-clicking `index.html` works, but browsers block web fonts on `file://` pages, so text falls
back to Palatino/Georgia. For the exact look, run a small local server in this folder:

```
python -m http.server 8000
```

and open <http://localhost:8000>.

## Common edits

**Add a paper.** In `publications.html`, copy an existing `<li ...>` line into the right topic
(newest first) and edit it. Set `data-y` to the year, or to `preprint` / `manuscript`, and put
the same value in the `<span class="y">`. The year view and the counts at the top update on
their own. When a preprint is published, change `data-y`/label to the year and replace the
`arXiv:...` text with the journal reference.

**Update the CV.** Recompile the LaTeX source with XeLaTeX and replace `cv.pdf`.

**Students.** Edit the `<li>` rows in `students.html`.

**Workshops, teaching.** Edit the corresponding `<li>` rows in `index.html`.

## Publish updates

GitHub Pages serves the root of the `main` branch in `snorin239/snorin239.github.io`.
The empty `.nojekyll` file keeps the HTML, CSS, JavaScript, fonts, and PDF unchanged.
No build tools or dependencies are required.

After editing and previewing the site, run these commands in this folder:

```
git status
git add index.html students.html publications.html cv.pdf assets README.md .gitattributes .gitignore .nojekyll
git diff --cached --stat
git commit -m "Update website"
git push
```

If you add a new page or another file outside `assets/`, add it explicitly with `git add` too.
Only stage files intended for the public repository. Each push to `main` automatically
publishes an update; allow a few minutes for it to appear.

Publication settings are at <https://github.com/snorin239/snorin239.github.io/settings/pages>:
Source **Deploy from a branch**, branch **main**, folder **/ (root)**.
Deployment progress is at <https://github.com/snorin239/snorin239.github.io/actions>.

To work on another computer, clone the repository first:

```
git clone https://github.com/snorin239/snorin239.github.io.git
cd snorin239.github.io
```

## Still hosted on the McGill server

These are linked by absolute URL and keep working as long as `math.mcgill.ca/snorin/` exists.
Copy them into this repository (and switch the links to relative ones) if that server space goes away.

- Course pages: `putnam2022.html`, `math594W21.html`, `math340W18.html`, `math550W18.html`,
  `math599W17.html`, `MATH240F11.html`, `matchingMinicourse.html` (and any files they link to)
- Paper PDFs in `papers/`: smallfam, k6large, k6bdtw, TuranMaxColor, besmall, onevertexextensions,
  union-en, minbricks, brick, pfjoins, drawpfaf.ps, signs, minNonPfaf, 4pfaf, flower, oncircchoose,
  cdchoose, 3ColMatrix, circularnull, ccchoose, JacobiansPaper, agree, brandt, tutte, Forests,
  HighDBrambles
