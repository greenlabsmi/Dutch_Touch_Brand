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
    const nav = document.querySelector(".dt-home .dt-nav");

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
    // MOBILE HERO SLIDER
    // ============================
    if (window.innerWidth <= 900) {
      const slides = document.querySelectorAll(".hero-mobile-slide");
      if (slides.length > 0) {
        let index = 0;
        slides[index].classList.add("active");

        setInterval(() => {
          slides[index].classList.remove("active");
          index = (index + 1) % slides.length;
          slides[index].classList.add("active");
        }, 3500);
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
