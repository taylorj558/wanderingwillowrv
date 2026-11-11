document.addEventListener("DOMContentLoaded", () => {
  // Check if we are deep in a folder (like /stories/) to adjust the path
  const isSubfolder = window.location.pathname.includes('/stories/');
  const basePath = isSubfolder ? '../' : './';

  // 1. Fetch and inject Header
  const headerPlaceholder = document.getElementById("global-header");
  if (headerPlaceholder) {
    fetch(basePath + "components/header.html")
      .then(response => {
        if (!response.ok) throw new Error("Header fetch failed");
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
        
        // Re-attach the mobile menu logic after the header exists
        const toggleBtn = document.getElementById('menuToggle');
        const nav = document.getElementById('site-nav');
        if (toggleBtn && nav) {
          toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nav.classList.toggle('show');
          });
        }
      })
      .catch(err => console.log("Header blocked (are you viewing this locally?):", err));
  }

  // 2. Fetch and inject Footer
  const footerPlaceholder = document.getElementById("global-footer");
  if (footerPlaceholder) {
    fetch(basePath + "components/footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Footer fetch failed");
        return response.text();
      })
      .then(data => {
        footerPlaceholder.innerHTML = data;
      })
      .catch(err => console.log("Footer blocked (are you viewing this locally?):", err));
  }
});
