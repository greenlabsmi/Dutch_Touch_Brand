// ============ MENU TOGGLE ============
function toggleMenu() {
  const menu = document.getElementById("menu");
  const body = document.body;
  menu.classList.toggle("active");
  body.classList.toggle("no-scroll");
}

// Close menu if user clicks outside inner container
document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const menuInner = document.querySelector(".menu-inner");
  const menuBtn = document.querySelector(".menu-btn");

  if (!menu.classList.contains("active")) return;

  // If click is NOT inside menu content and not on the button → close
  if (!menuInner.contains(e.target) && !menuBtn.contains(e.target)) {
    toggleMenu();
  }
});

// ============ HERO CAROUSEL ============
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function showNextSlide() {
  if (slides.length === 0) return;
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

// start carous
