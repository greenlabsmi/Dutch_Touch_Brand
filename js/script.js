// ============================================================
// DUTCH TOUCH • GLOBAL HOMEPAGE JS
// Slide-out menu • Outside click • Hero rotation
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

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

    // animate links in (optional)
    if (menu.classList.contains("active")) {
      animateMenuLinks();
    }
  }

  // OPEN
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  // CLOSE BUTTON
  if (menuClose) {
    menuClose.addEventListener("click", toggleMenu);
  }

  // OUTSIDE CLICK CLOSE
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const insideMenu = menu.contains(e.target);
    const clickedHamburger = menuToggle.contains(e.target);

    if (!insideMenu && !clickedHamburger) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // ANIMATED SLIDE-IN LINKS
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

    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add("active");
  }

  // Start rotation
  if (slides.length > 0) {
    slides[0].classList.add("active");
    setInterval(showNextSlide, 6000);
  }

});
