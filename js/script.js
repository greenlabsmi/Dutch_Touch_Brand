// ==========================
// HOME PAGE JS ONLY
// ==========================

// Make toggleMenu() available globally
let toggleMenu;

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAV SCROLL (Transparent → Solid)
  // ------------------------------------------------------------
  const nav = document.querySelector(".dt-home .dt-nav");

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
  // HAMBURGER MENU
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-home .dt-nav-hamburger");

  toggleMenu = () => {
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  if (hamburger) hamburger.addEventListener("click", toggleMenu);

  // Close if clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);

    if (!clickedInsideMenu && !clickedHamburger) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // NAV TEXT SHIMMER
  // ------------------------------------------------------------
  const navText = document.querySelector(".dt-home .dt-nav-text");
  if (navText) {
    navText.classList.add("shimmer-active");
  }


  // ------------------------------------------------------------
  // FADE-IN OBSERVER
  // ------------------------------------------------------------
  const fadeEls = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: "0px 0px -40px 0px"
  });

  fadeEls.forEach(el => observer.observe(el));


}); // END DOMContentLoaded



// ============================================================
// MOBILE HERO SLIDER (<900px)
// ============================================================
function initMobileHeroSlider() {
  if (window.innerWidth > 900) return;

  const slides = document.querySelectorAll(".hero-mobile-slide");
  if (!slides.length) return;

  let index = 0;
  slides[index].classList.add("active");

  setInterval(() => {
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
  }, 3500);
}

document.addEventListener("DOMContentLoaded", initMobileHeroSlider);
