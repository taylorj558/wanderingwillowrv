# Wandering Willow RV — website

Plain HTML + CSS, no build tools. Hosted free on **GitHub Pages** at **www.wanderingwillowrv.com**.

```
index.html            Home
stories.html          Story cards + "Places we've parked" collection (with filters)
gear.html             All affiliate product cards
about.html            About us + timeline
contact.html          Contact form (Formspree)
disclosure.html       Affiliate disclosure (required by Amazon Associates)
privacy.html          Privacy policy (starter)
404.html              "Wrong turn" page
stories/              One HTML file per story
  _story-template.html  Copy this to start a new story
assets/css/style.css  All styling (colors at the very top)
assets/js/main.js     Mobile menu, story filters, photo placeholders
assets/img/           Your photos — see PHOTO-LIST.md for file names
CNAME                 Tells GitHub your custom domain
```

---

## Part 1 — Put the site on GitHub (≈15 minutes)

1. **Create a GitHub account** at https://github.com (free). Pick a username you're happy with; it shows in the temporary URL.
2. **Create a repository**: click **+ → New repository**
   - Name: `wanderingwillowrv` (any name works)
   - Visibility: **Public** (free GitHub Pages needs a public repo)
   - Leave "Add a README" unchecked → **Create repository**
3. **Upload the files** (easiest way, no software needed):
   - On the new repo page click **uploading an existing file**.
   - Unzip the site on your computer, open the `wandering-willow` folder, select **everything inside it** (including the `assets` and `stories` folders) and drag it onto the page.
   - Commit message: `First version of the site` → **Commit changes**.
   - ⚠️ Mac/Windows hide files starting with a dot. Make sure `.nojekyll` made it up; if not, click **Add file → Create new file**, name it `.nojekyll`, leave it empty, commit.
4. **Turn on GitHub Pages**: repo **Settings → Pages**
   - Source: **Deploy from a branch**
   - Branch: **main**, folder **/ (root)** → **Save**
   - Wait 1–2 minutes. Your site is live at `https://YOUR-USERNAME.github.io/wanderingwillowrv/`. Click around and make sure it works.

> **Want an easier way to edit later?** Install **GitHub Desktop** (desktop.github.com) and choose *Clone repository*. You get a normal folder on your computer — edit files in VS Code (free), then click **Commit** and **Push** in GitHub Desktop. Changes go live in about a minute.

---

## Part 2 — Connect your domain

### A. Tell GitHub about the domain
1. Repo **Settings → Pages → Custom domain**: type `www.wanderingwillowrv.com` → **Save**.
   (The `CNAME` file in this repo already says this; GitHub just needs to see it in settings too.)
2. Recommended — prevents anyone else from hijacking your domain on GitHub:
   Your profile picture → **Settings → Pages → Add a domain** → enter `wanderingwillowrv.com` and follow the TXT-record instructions.

### B. Change DNS where your domain is registered
Log in wherever you bought the domain (if you bought it through Wix: **Wix → Domains → ⋯ → Manage DNS Records**; GoDaddy/Namecheap/Squarespace/Cloudflare have a similar "DNS" page).

**Delete** the existing records that point the root (`@`) and `www` at Wix, then add:

| Type | Host / Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | YOUR-USERNAME.github.io |

(Use your GitHub username in the CNAME — **not** the repo name, no `https://`.)
Leave any **MX** records alone — those are for email.

DNS takes anywhere from a few minutes to 24 hours. Both `wanderingwillowrv.com` and `www.wanderingwillowrv.com` will then open the site.

### C. Turn on HTTPS
Back in **Settings → Pages**, once the domain check turns green, tick **Enforce HTTPS**. (If it's greyed out, GitHub is still issuing the certificate — check back in an hour.)

### D. Leaving Wix safely
- If the domain is **registered at Wix**, keep the domain registration renewing even after you cancel the Wix *site* plan — or transfer the domain to a registrar like Cloudflare or Namecheap (often cheaper).
- Download any photos and blog text you still need from Wix before canceling.

---

## Part 3 — Everyday editing

### Add your affiliate links
Every buy button has a placeholder link like `href="#AFFILIATE-oupes-mega-1"`.
In VS Code press **Ctrl/Cmd + Shift + F**, search `#AFFILIATE-`, and replace each with your real link.
Keep `rel="sponsored nofollow noopener"` on every affiliate link.

Placeholders in use: `oupes-mega-1`, `oupes-mega-3`, `oupes-guardian`, `soft-start`, `renogy-200w`, `renogy-mppt`, `big-berkey`, `pur-dispenser`, `pur-filters`, `inline-filter`, `water-containers`, `gyroor-c1s`, `storage-tent`, `shower-tent`, `solar-shower`, `high-velocity-fan`. (The Power Watchdog already has your amzn.to link.)

They appear in **gear.html** and in the story pages, so replace them everywhere (search-and-replace across the folder does this in one shot).

### Add photos
See `assets/img/PHOTO-LIST.md`. Missing photos show a green placeholder, so you can launch before every photo is ready.

### Publish a new story
1. Copy `stories/_story-template.html` → rename (e.g. `stories/gulf-shores-state-park.html`).
2. Fill it in (title + description at the top of the file too).
3. On `stories.html`, copy an existing `<article class="card">` block to the top of the grid and point it at the new file. Add a "Places we've parked" card if it's a campground.
4. Optionally swap it onto the home page "Latest stories" section.
5. Add the URL to `sitemap.xml`.
6. Commit + push.

### Set up the contact form
1. Free account at https://formspree.io → **New form**.
2. Copy the form ID and replace `YOUR_FORM_ID` in `contact.html`.

### Change colors / fonts
Top of `assets/css/style.css` — `--forest`, `--ember`, `--cream`, etc. Fonts are Fraunces (headings) and Work Sans (body) from Google Fonts.

### Social links
In the footer of each page, replace the `href="#"` on the YouTube / Instagram / Facebook / TikTok icons. (Search for `aria-label="YouTube"` etc.)

---

## After launch
- **Google Search Console** (search.google.com/search-console): add the domain, submit `https://www.wanderingwillowrv.com/sitemap.xml`.
- **Amazon Associates**: add `https://www.wanderingwillowrv.com` to your Associates account website list.
- **Analytics** (optional): GoatCounter or Plausible are privacy-friendly; Google Analytics is free. Update `privacy.html` when you add one.
