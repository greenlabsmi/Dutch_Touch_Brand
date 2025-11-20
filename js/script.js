console.log("DTG SCRIPT LOADED");

// ===================================================================
// GLOBAL: MENU TOGGLE FUNCTION (used by inline onclick)
// ===================================================================
function toggleMenu() {
  const menu = document.getElementById("dt-menu");
  if (!menu) return;

  const isOpen = menu.classList.toggle("active");
  document.body.classList.toggle("no-scroll", isOpen);

  if (isOpen) {
    revealMenuLinks();
  } else {
    resetMenuLinks();
  }
}

// ===================================================================
// DOM LOADED
// ===================================================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM READY");

  const body = document.body;

  // ---------------------------------------------------------------
  // HOMEPAGE ONLY
  // ---------------------------------------------------------------
  if (body.classList.contains("dt-home")) {
    console.log("HOMEPAGE JS ACTIVE");

    // ============================
    // NAV SCROLL → SOLID
    // ============================
    const nav = document.getElementById("dtNav");

    function updateNav() {
      if (!nav) return;
      if (window.scrollY > 10) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }

    updateNav();
    window.addEventListener("scroll", updateNav);

    // ============================
    // HAMBURGER HANDLER
    // ============================
    const hamburger = document.querySelector(".dt-home .dt-nav-hamburger");
    const menu = document.getElementById("dt-menu");

    if (hamburger) {
      hamburger.addEventListener("click", () => {
        toggleMenu();
      });
    }

    // ============================
    // CLOSE WHEN CLICKING OUTSIDE
    // ============================
    document.addEventListener("click", (e) => {
      if (!menu) return;
      if (!menu.classList.contains("active")) return;

      const clickedInsideMenu = menu.contains(e.target);
      const clickedHamburger = hamburger && hamburger.contains(e.target);

      if (!clickedInsideMenu && !clickedHamburger) {
        toggleMenu();
      }
    });

    // ============================
    // HERO CAROUSEL — OPTION A (CROSSFADE)
    // ============================
    const slides = document.querySelectorAll(".dt-home .hero-slide");
    if (slides.length > 0) {
      let current = 0;

      // Ensure only first is active at start
      slides.forEach((slide, index) => {
        slide.classList.toggle("active", index === 0);
      });

      if (slides.length > 1) {
        setInterval(() => {
          const prev = current;
          current = (current + 1) % slides.length;

          slides[prev].classList.remove("active");
          slides[current].classList.add("active");
        }, 6000); // 6s between slides
      }
    }

    // ============================
    // TILE SCROLL ANIMATION (Strength B, staggered)
    // ============================
    const tiles = document.querySelectorAll(".dt-home .dt-grid .dt-tile");

    if (tiles.length > 0) {
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const el = entry.target;
                const index = Array.from(tiles).indexOf(el);
                const delay = 0.14 * index; // 140ms stagger

                el.style.transitionDelay = `${delay}s`;
                el.classList.add("dt-tile-visible");
                observer.unobserve(el);
              }
            });
          },
          {
            threshold: 0.35,
          }
        );

        tiles.forEach((tile) => observer.observe(tile));
      } else {
        // Fallback: reveal immediately if IntersectionObserver not supported
        tiles.forEach((tile) => tile.classList.add("dt-tile-visible"));
      }
    }
  }
});

// ===================================================================
// MENU LINK CASCADE ANIMATION
// ===================================================================
function revealMenuLinks() {
  const links = document.querySelectorAll("#dt-menu .dt-menu-links a");
  if (!links.length) return;

  links.forEach((link, i) => {
    link.classList.remove("revealed"); // reset fresh
    setTimeout(() => {
      link.classList.add("revealed");
    }, 120 * i); // stagger timing
  });
}

function resetMenuLinks() {
  const links = document.querySelectorAll("#dt-menu .dt-menu-links a");
  links.forEach((link) => link.classList.remove("revealed"));
}
