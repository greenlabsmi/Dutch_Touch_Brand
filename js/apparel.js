// ============================================================
// DUTCH TOUCH • APPAREL PAGE JS
// Fade-ins • Filters • Carousel • Jeeter-Style Nav + Menu
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAVBAR TRANSPARENT → SOLID ON SCROLL
  // ------------------------------------------------------------
  const nav = document.querySelector(".dt-nav");

  function handleNavScroll() {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  handleNavScroll();
  window.addEventListener("scroll", handleNavScroll);


  // ------------------------------------------------------------
  // SLIDE-OUT MENU (LEFT SIDE)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const body = document.body;
  const hamburger = document.querySelector(".dt-nav-hamburger");
  const closeBtn = document.querySelector(".dt-menu-close");

  function toggleMenu() {
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");

    if (menu.classList.contains("active")) {
      animateMenuLinks();
    }
  }

  if (hamburger) hamburger.addEventListener("click", toggleMenu);
  if (closeBtn) closeBtn.addEventListener("click", toggleMenu);

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const insideMenu = menu.contains(e.target);
    const clickedHamburger = hamburger.contains(e.target);

    if (!insideMenu && !clickedHamburger) {
      toggleMenu();
    }
  });

  function animateMenuLinks() {
    const links = document.querySelectorAll(".dt-menu-links a");
    links.forEach((link, i) => {
      link.classList.remove("animate-in");
      setTimeout(() => {
        link.classList.add("animate-in");
      }, 90 * i);
    });
  }


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
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
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
        const cat = card.dataset.category;
        if (filter === "all" || cat === filter) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
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
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3")?.textContent || "Item";
      console.log("Quick View:", name);
    });
  });

}); // ← ✅ CLOSES MAIN DOMContentLoaded


// ============================================================
// MOBILE HERO SLIDER (only below 900px)
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

document.addEventListener("DOMContentLoaded", () => {
  initMobileHeroSlider();
});
