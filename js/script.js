// MENU TOGGLE
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("active");
}

// Close menu when clicking outside (optional; smooth UX)
document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const btn = document.querySelector(".menu-btn");

  if (!menu.contains(e.target) && !btn.contains(e.target)) {
    menu.classList.remove("active");
  }
});

// HERO CAROUSEL
let currentSlide = 0;
const slides = document.querySelectorAll(".hero-slide");

function nextSlide() {
  slides[currentSlide].classList.remove("active");
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add("active");
}

setInterval(nextSlide, 5000);
