// ============================================================
// DUTCH TOUCH • APPAREL PAGE JS
// Isolated to apparel.html — nav, menu, hero slider, filters,
// carousel, and simple fade-ins
// ============================================================

let toggleMenu; // global so inline HTML could use it later if needed

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-apparel-page")) return;

  // ------------------------------------------------------------
  // NAVBAR TRANSPARENT → SOLID ON SCROLL
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
  // SLIDE-OUT MENU (LEFT SIDE)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-nav-hamburger");

  toggleMenu = function () {
    if (!menu) return;
    const isOpen = menu.classList.toggle("active");
    body.classList.toggle("no-scroll", isOpen);

    if (isOpen) revealMenuLinks();
    else resetMenuLinks();
  };

  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  const closeBtn = document.querySelector(".dt-menu-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking a menu link
  document.querySelectorAll("#dt-menu .dt-menu-links a").forEach((link) => {
    link.addEventListener("click", () => toggleMenu());
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("active")) return;

    const insideMenu = menu.contains(e.target);
    const clickedHamburger = hamburger && hamburger.contains(e.target);

    if (!insideMenu && !clickedHamburger) toggleMenu();
  });

  // ------------------------------------------------------------
  // FADE-IN OBSERVER
  // ------------------------------------------------------------
  const fadeEls = document.querySelectorAll(".fade-in");
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );
  fadeEls.forEach((el) => fadeObserver.observe(el));

  // ------------------------------------------------------------
  // PRODUCT FILTERS
  // ------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      productCards.forEach((card) => {
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
  document.querySelectorAll(".quick-add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      const name = card.querySelector("h3")?.textContent || "Item";
      console.log("Quick View:", name);
    });
  });
});

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

// ============================================================
// MENU LINK CASCADE HELPERS (for apparel menu)
// ============================================================
function revealMenuLinks() {
  const links = document.querySelectorAll("#dt-menu .dt-menu-links a");
  links.forEach((link, i) => {
    link.classList.remove("revealed");
    setTimeout(() => link.classList.add("revealed"), 120 * i);
  });
}

function resetMenuLinks() {
  document
    .querySelectorAll("#dt-menu .dt-menu-links a")
    .forEach((link) => link.classList.remove("revealed"));
}
