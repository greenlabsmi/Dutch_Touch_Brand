console.log("DTG SCRIPT LOADED");

// ===================================================================
// GLOBAL: MENU TOGGLE FUNCTION
// ===================================================================
function toggleMenu() {
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-nav-hamburger");
  if (!menu || !hamburger) return;

  const isOpen = menu.classList.toggle("active");
  document.body.classList.toggle("no-scroll", isOpen);

  // Accessibility state
  hamburger.setAttribute("aria-expanded", isOpen ? "true" : "false");

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
    const nav = document.getElementById("dtNav");
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

let heroInterval = null;
let isPaused = false;

function startHero() {
  if (heroInterval) return;

  heroInterval = setInterval(() => {
    if (isPaused) return;

    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 4500);
}

function pauseHero() {
  isPaused = true;
}

function resumeHero() {
  isPaused = false;
}

if (slides.length > 1) {
  startHero();

  // Pause on hover (desktop)
  slides.forEach(slide => {
    slide.addEventListener("mouseenter", pauseHero);
    slide.addEventListener("mouseleave", resumeHero);

    // Pause on touch (mobile)
    slide.addEventListener("touchstart", pauseHero, { passive: true });
    slide.addEventListener("touchend", resumeHero);

    // Pause on keyboard focus
    slide.addEventListener("focusin", pauseHero);
    slide.addEventListener("focusout", resumeHero);
  });
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
        threshold: 0.05, // trigger much earlier so desktop gets glow
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
