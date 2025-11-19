// ==========================
// HOME PAGE JS (Fixed + Clean)
// ==========================

// Make toggleMenu a global function
let toggleMenu;

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAV: Transparent → Solid on scroll
  // ------------------------------------------------------------
  const nav = document.querySelector(".dt-home .dt-nav");

  const updateNavOnScroll = () => {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll);


  // ------------------------------------------------------------
  // SLIDE-OUT MENU
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-home .dt-nav-hamburger");

  toggleMenu = () => {
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  };

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });


  // ------------------------------------------------------------
  // NAV TEXT LOGO — SHIMMER ACTIVATION
  // ------------------------------------------------------------
  const navText = document.querySelector(".dt-nav-text");
  if (navText) navText.classList.add("shimmer-active");


  // ------------------------------------------------------------
  // FADE-IN OBSERVER
  // ------------------------------------------------------------
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  fadeEls.forEach(el => observer.observe(el));


  // ------------------------------------------------------------
  // PRODUCT FILTERS
  // ------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      productCards.forEach(card => {
        card.classList.toggle(
          "is-hidden",
          filter !== "all" && card.dataset.category !== filter
        );
      });
    });
  });


  // ------------------------------------------------------------
  // CAPSULE CAROUSEL
  // ------------------------------------------------------------
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn-prev");
  const nextBtn = document.querySelector(".carousel-btn-next");

  if (track && prevBtn && nextBtn) {
    const scrollAmount = () => track.clientWidth * 0.8;

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  }


  // ------------------------------------------------------------
  // QUICK ADD (placeholder)
  // ------------------------------------------------------------
  document.querySelectorAll(".quick-add").forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      console.log("Quick View:", card.querySelector("h3")?.textContent);
    });
  });


  // ------------------------------------------------------------
  // MOBILE HERO SLIDER (<900px)
  // ------------------------------------------------------------
  if (window.innerWidth <= 900) {
    const slides = document.querySelectorAll(".hero-mobile-slide");
    if (slides.length > 0) {
      let index = 0;
      slides[index].classList.add("active");

      setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
      }, 3500);
    }
  }

}); // END DOMContentLoaded
