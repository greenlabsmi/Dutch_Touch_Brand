console.log("HOME SCRIPT LOADED");

// Make sure toggleMenu exists for safety (prevents inline onclick errors)
function toggleMenu() {
  const menu = document.getElementById("dt-menu");
  menu.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
}

// ==========================
// HOME PAGE JS ONLY
// ==========================

document.addEventListener("DOMContentLoaded", () => {

  console.log("DOM READY");

  // -----------------------------
  // NAV SCROLL (Transparent → Solid)
  // -----------------------------
  const nav = document.querySelector(".dt-home .dt-nav");

  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }

  updateNav();
  window.addEventListener("scroll", updateNav);


  // -----------------------------
  // HAMBURGER MENU
  // -----------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-home .dt-nav-hamburger");

  if (!hamburger) {
    console.warn("Hamburger NOT FOUND");
  } else {
    console.log("Hamburger FOUND:", hamburger);

    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });
  }


  // CLOSE WHEN CLICKING OUTSIDE
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }
  });


  // -----------------------------
  // NAV TEXT SHIMMER
  // -----------------------------
  const navText = document.querySelector(".dt-nav-text");
  if (navText) navText.classList.add("shimmer-active");


  // -----------------------------
  // MOBILE HERO SLIDER (<900px)
  // -----------------------------
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

  initMobileHeroSlider();

}); // END DOMContentLoaded
