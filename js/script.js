// ============================================================
// DUTCH TOUCH • HOMEPAGE JS
// Menu toggle • Hero rotation • Outside click logic
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // SLIDE-OUT MENU (matches index.html)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const menuToggle = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");
  const body = document.body;

  // Open / close
  function toggleMenu() {
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");
  }

  // Attach toggle to hamburger
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // Close button inside menu
  if (menuClose) {
    menuClose.addEventListener("click", toggleMenu);
  }

  // Close when clicking outside menu
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;
    const inside = menu.contains(e.target);
    const isToggle = menuToggle.contains(e.target);
    if (!inside && !isToggle) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // HERO CAROUSEL (FADE ROTATION)
  // ------------------------------------------------------------
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlide = 0;
  let slideInterval = null;

  function showNextSlide() {
    if (slides.length <= 1) return;

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // Auto-rotate every 6 seconds
  function startHeroCarousel() {
    if (!slideInterval) {
      slideInterval = setInterval(showNextSlide, 6000);
    }
  }

  // Start immediately
  if (slides.length > 0) {
    slides[0].classList.add("active");
    startHeroCarousel();
  }

});
