document.addEventListener("DOMContentLoaded", () => {
  // Load Global Header
  const headerPlaceholder = document.getElementById("global-header");
  if (headerPlaceholder) {
    fetch("/components/header.html")
      .then(response => response.text())
      .then(data => {
        headerPlaceholder.innerHTML = data;

        // Attach Mobile Menu Toggle Logic
        const toggleBtn = document.getElementById('menuToggle');
        const nav = document.getElementById('site-nav');
        if (toggleBtn && nav) {
          toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            toggleBtn.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('show');
          });
        }

        // Auto-Highlight Active Page Link
        const currentPath = window.location.pathname;
        const links = headerPlaceholder.querySelectorAll("nav a");
        links.forEach(link => {
          const linkPath = link.getAttribute("href");
          if (currentPath === linkPath || (linkPath !== "/" && currentPath.startsWith(linkPath))) {
            link.setAttribute("aria-current", "page");
            link.classList.add("active");
          }
        });
      })
      .catch(err => console.error("Error loading header:", err));
  }

  // Load Global Footer
  const footerPlaceholder = document.getElementById("global-footer");
  if (footerPlaceholder) {
    fetch("/components/footer.html")
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(err => console.error("Error loading footer:", err));
  }
});
