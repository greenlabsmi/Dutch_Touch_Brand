// ============================================================
// DUTCH TOUCH • GLOBAL HOMEPAGE JS
// Slide-out menu • Outside click • Hero rotation • Sticky Nav
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAV: TRANSPARENT AT TOP → SOLID ON SCROLL (JEETER STYLE)
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
  // SLIDE-OUT MENU (75% WIDTH PANEL)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const menuToggle = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");
  const body = document.body;

  function toggleMenu() {
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");

    // link animation when opening
    if (menu.classList.contains("active")) {
      animateMenuLinks();
    }
  }

  // OPEN
  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);

  // CLOSE BUTTON
  if (menuClose) menuClose.addEventListener("click", toggleMenu);

  // ------------------------------------------------------------
  // CLOSE MENU WHEN CLICKING OUTSIDE PANEL ONLY
  // ------------------------------------------------------------
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const menuInner = document.querySelector(".dt-menu-inner");

    const clickedInsidePanel = menuInner.contains(e.target);
    const clickedHamburger = menuToggle.contains(e.target);

    if (!clickedInsidePanel && !clickedHamburger) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // ANIMATED SLIDE-IN MENU LINKS
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

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // Start rotation
  if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showNextSlide, 6000);
  }


  // ------------------------------------------------------------
  // OPTIONAL: APPEARING ANIMATIONS PREP (future use)
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

});
