// ============================================================
// DUTCH TOUCH • GLOBAL HOMEPAGE JS (PATCHED & STABLE)
// Slide-out menu • Outside click • Hero rotation • Sticky Nav
// ============================================================

// Make toggleMenu globally accessible BEFORE DOMContentLoaded
let toggleMenu;

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAV: TRANSPARENT AT TOP → SOLID ON SCROLL
  // ------------------------------------------------------------
  const nav = document.getElementById("dtNav");

  function updateNavOnScroll() {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll);


  // ------------------------------------------------------------
  // SLIDE-OUT MENU
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const menuToggleBtn = document.querySelector(".dt-nav-hamburger");
  const menuCloseBtn = document.querySelector(".dt-menu-close");
  const body = document.body;

  // GLOBAL toggleMenu (fixes onclick error)
  toggleMenu = function () {
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");

    // Animate links when opening
    if (menu.classList.contains("active")) {
      animateMenuLinks();
    }
  };

  // Hamburger button
  if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", toggleMenu);
  }

  // Close button
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", toggleMenu);
  }


  // ------------------------------------------------------------
  // CLICK OUTSIDE TO CLOSE MENU
  // ------------------------------------------------------------
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const menuInner = document.querySelector(".dt-menu-inner");
    const clickedInsidePanel = menuInner.contains(e.target);
    const clickedHamburger = menuToggleBtn.contains(e.target);

    if (!clickedInsidePanel && !clickedHamburger) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // ANIMATED MENU LINKS
  // ------------------------------------------------------------
  function animateMenuLinks() {
    const links = document.querySelectorAll(".dt-menu-links a");
    links.forEach((link, i) => {
      link.style.opacity = "0";
      link.style.transform = "translateX(-20px)";
      setTimeout(() => {
        link.style.transition = "all .35s ease";
        link.style.opacity = "1";
        link.style.transform = "translateX(0)";
      }, 80 * i);
    });
  }


 // ------------------------------------------------------------
// HERO CAROUSEL (STATIC FADE)
// ------------------------------------------------------------
const slides = document.querySelectorAll(".hero-slide");
let currentSlide = 0;

function showNextSlide() {
  if (slides.length <= 1) return;

  // remove active from all slides first (safety)
  slides.forEach(slide => slide.classList.remove("active"));

  // move to next
  currentSlide = (currentSlide + 1) % slides.length;

  // activate current
  slides[currentSlide].classList.add("active");
}

// Initialize
if (slides.length > 0) {
  // ensure only the first slide starts as active
  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === 0);
  });

  setInterval(showNextSlide, 6000);
}

  // ------------------------------------------------------------
  // APPEARING ANIMATIONS (future use)
  // ------------------------------------------------------------
  const animateEls = document.querySelectorAll(".animate-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  animateEls.forEach((el) => observer.observe(el));


  // ------------------------------------------------------------
  // DESKTOP NAV LOGO ANIMATION
  // ------------------------------------------------------------
  const desktop = window.matchMedia("(min-width: 768px)");

  if (desktop.matches) {
    const logo = document.querySelector(".dt-nav-logo");
    if (logo) {
      setTimeout(() => {
        logo.classList.add("animate");
      }, 200); // slight delay prevents layout shift
    }
  }

});
