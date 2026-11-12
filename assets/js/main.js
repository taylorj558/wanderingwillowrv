// Wandering Willow RV — shared site script.
// Loads the global header and footer from /components/ into every page,
// then runs the small helpers (mobile menu, current-page highlight, story filters, photo placeholders).

document.addEventListener("DOMContentLoaded", () => {
  loadPart("global-header", "/components/header.html", setupHeader);
  loadPart("global-footer", "/components/footer.html", setupFooter);
  setupImageFallbacks();
  setupStoryFilters();
  setupPinterestSave();
});

// Pinterest "Save" button that appears when you hover over a photo.
// Uses Pinterest's own pinit.js; the pin links back to the page it came from.
// Add data-pin-nopin to any <img> that shouldn't get the button.
function setupPinterestSave() {
  if (window.location.pathname.startsWith("/pins")) return; // that page has its own pin tools
  if (document.querySelector('script[src*="assets.pinterest.com/js/pinit"]')) return;
  // Pinterest uses the alt text as the pin description; fall back to the page title.
  document.querySelectorAll("img").forEach((img) => {
    if (!img.getAttribute("data-pin-description") && !img.alt) img.setAttribute("data-pin-description", document.title);
  });
  const s = document.createElement("script");
  s.async = true;
  s.defer = true;
  s.src = "https://assets.pinterest.com/js/pinit.js";
  s.setAttribute("data-pin-hover", "true");
  s.setAttribute("data-pin-tall", "true");
  document.body.appendChild(s);
}

// Fetch a component and swap it in place of its placeholder <div>.
// (Replacing the div, rather than filling it, keeps the header "sticky" while scrolling.)
function loadPart(placeholderId, url, afterLoad) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) return;
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(url + " returned " + res.status);
      return res.text();
    })
    .then((html) => {
      const holder = document.createElement("div");
      holder.innerHTML = html.trim();
      const parts = Array.from(holder.childNodes);
      placeholder.replaceWith(...parts);
      if (afterLoad) afterLoad();
    })
    .catch((err) => console.warn("Could not load " + url + " (opening the file directly from your computer blocks this; it works on the live site):", err));
}

function setupHeader() {
  // Mobile menu
  const btn = document.getElementById("menuToggle") || document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (btn && nav) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Highlight the page you're on. Story pages highlight "Stories".
  let path = window.location.pathname.replace(/index\.html$/, "");
  if (path.startsWith("/stories/")) path = "/stories.html";
  document.querySelectorAll(".nav a").forEach((link) => {
    const target = new URL(link.getAttribute("href"), window.location.origin).pathname.replace(/index\.html$/, "");
    if (target === path) link.setAttribute("aria-current", "page");
  });
}

function setupFooter() {
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
}

// If a photo is missing, show the colored placeholder instead of a broken image.
function setupImageFallbacks() {
  document.querySelectorAll(".card-media img, .photo-frame img, .article-cover img, .product-img img, .hero-img, .prose figure img").forEach((img) => {
    const fail = () => {
      const parent = img.parentElement;
      if (parent && (parent.tagName === "FIGURE" || parent.classList.contains("product-img"))) { parent.remove(); return; }
      img.remove();
      if (parent && parent.classList.contains("card-media")) parent.classList.add("no-img");
    };
    if (img.complete && img.naturalWidth === 0) fail();
    else img.addEventListener("error", fail);
  });
}

// Story filter buttons on stories.html: buttons with data-filter, cards with data-category="a b c"
function setupStoryFilters() {
  const chips = document.querySelectorAll(".chip[data-filter]");
  if (!chips.length) return;
  const cards = document.querySelectorAll("[data-category]");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.getAttribute("data-filter");
      chips.forEach((c) => c.setAttribute("aria-pressed", c === chip ? "true" : "false"));
      cards.forEach((card) => {
        const cats = (card.getAttribute("data-category") || "").split(" ");
        card.hidden = !(f === "all" || cats.includes(f));
      });
    });
  });
}
