// ============================================================
// DUTCH TOUCH • GLOBAL HOMEPAGE JS (CLEAN & FIXED)
// ============================================================

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
  const menu = document.getElementById("dt-menu");   // ✔ correct ID
  const menuToggleBtn = document.querySelector(".dt-nav-hamburger");
  const menuCloseBtn = document.querySelector(".dt-menu-close");
  const body = document.body;

  // SINGLE correct toggle function
  toggleMenu = function () {
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");

    if (menu.classList.contains("active")) {
      animateMenuLinks();
    }
  };

  // Hamburger click
  if (menuToggleBtn) menuToggleBtn.addEventListener("click", toggleMenu);

  // Close button
  if (menuCloseBtn) menuCloseBtn.addEventListener("click", toggleMenu);


  // ------------------------------------------------------------
  // CLICK OUTSIDE TO CLOSE
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
  // HERO CAROUSEL
  // ------------------------------------------------------------
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;

  function showNextSlide() {
    if (slides.length <= 1) return;

    slides.forEach(slide => slide.classList.remove("active"));
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  if (slides.length > 0) {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === 0);
    });
    setInterval(showNextSlide, 6000);
  }

  // ------------------------------------------------------------
  // DESKTOP LOGO SLIDE-IN
  // ------------------------------------------------------------
  if (window.innerWidth >= 768) {
    const logo = document.querySelector(".dt-nav-logo");
    if (logo) {
      setTimeout(() => logo.classList.add("animate"), 200);
    }
  }

});
