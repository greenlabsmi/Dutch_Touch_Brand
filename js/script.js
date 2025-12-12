===== script.js =====
console.log("DTG SCRIPT LOADED");

// ===================================================================
// GLOBAL: MENU TOGGLE FUNCTION
// ===================================================================
function toggleMenu() {
  const menu = document.getElementById("dt-menu");
  if (!menu) return;

  const isOpen = menu.classList.toggle("active");
  document.body.classList.toggle("no-scroll", isOpen);

  if (isOpen) revealMenuLinks();
  else resetMenuLinks();
}

// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  if (!body.classList.contains("dt-home")) return;

  // ============================
  // NAV SCROLL
  // ============================
  const nav = document.getElementById("dtNav");

  function updateNav() {
    if (window.scrollY <= 10) {
      nav.classList.remove("scrolled");
    } else {
      nav.classList.add("scrolled");
    }
  }

  updateNav();
  window.addEventListener("scroll", updateNav);

  // ============================
  // HAMBURGER
  // ============================
  const hamburger = document.querySelector(".dt-nav-hamburger");
  const menu = document.getElementById("dt-menu");

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // CLOSE WHEN CLICKING OUTSIDE
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const inside = menu.contains(e.target);
    const clickedHam = hamburger.contains(e.target);

    if (!inside && !clickedHam) toggleMenu();
  });

  // ============================
  // HERO CROSSFADE
  // ============================
  const slides = document.querySelectorAll(".hero-slide");
  let index = 0;

  if (slides.length > 1) {
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, 6000);
  }

  // ============================
  // SCROLL REVEAL — TILES
  // ============================
  const tiles = document.querySelectorAll(".dt-grid .dt-tile");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const tile = entry.target;
            const all = Array.from(tiles);
            const i = all.indexOf(tile);
            const delay = 0.14 * i;

            tile.style.transitionDelay = `${delay}s`;
            tile.classList.add("dt-tile-visible");

            observer.unobserve(tile);
          }
        });
      },
      {
        threshold: 0.05,
      }
    );

    tiles.forEach((t) => observer.observe(t));
  } else {
    tiles.forEach((t) => t.classList.add("dt-tile-visible"));
  }
});

// ===================================================================
// MENU LINK CASCADE
// ===================================================================
function revealMenuLinks() {
  const links = document.querySelectorAll("#dt-menu .dt-menu-links a");
  links.forEach((link, i) => {
    link.classList.remove("revealed");
    setTimeout(() => link.classList.add("revealed"), 120 * i);
  });
}

function resetMenuLinks() {
  document
    .querySelectorAll("#dt-menu .dt-menu-links a")
    .forEach((link) => link.classList.remove("revealed"));
}
