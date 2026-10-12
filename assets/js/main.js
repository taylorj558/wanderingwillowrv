// Wandering Willow RV — small helpers. No libraries needed.

// Mobile menu toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
})();

// If a card/cover photo is missing, show the colored placeholder instead of a broken image.
document.querySelectorAll('.card-media img, .photo-frame img, .article-cover img, .product-img img, .hero-img, .prose figure img').forEach(function (img) {
  function fail() {
    var parent = img.parentElement;
    // Missing photo inside a story or product card: hide the whole frame
    if (parent && (parent.tagName === 'FIGURE' || parent.classList.contains('product-img'))) { parent.remove(); return; }
    img.remove();
    if (parent && parent.classList.contains('card-media')) parent.classList.add('no-img');
  }
  if (img.complete && img.naturalWidth === 0) fail();
  else img.addEventListener('error', fail);
});

// Story filters (stories.html): buttons with data-filter, cards with data-category="a b c"
(function () {
  var chips = document.querySelectorAll('.chip[data-filter]');
  if (!chips.length) return;
  var cards = document.querySelectorAll('[data-category]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var f = chip.getAttribute('data-filter');
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'); });
      cards.forEach(function (card) {
        var cats = (card.getAttribute('data-category') || '').split(' ');
        card.hidden = !(f === 'all' || cats.indexOf(f) !== -1);
      });
    });
  });
})();

// Keep the footer year current
document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
