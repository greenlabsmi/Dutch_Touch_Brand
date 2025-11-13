function toggleMenu() {
  document.getElementById("menu").classList.toggle("active");
}

// HERO SLIDER
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-slide");

setInterval(() => {
  slides[slideIndex].classList.remove("active");
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}, 4200);

