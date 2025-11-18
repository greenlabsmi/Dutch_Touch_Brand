// ============================================================
// DUTCH TOUCH • APPAREL PAGE JS
// Clean • Conflict-Proof • Shimmer-Safe • Working Hamburger
// ============================================================

// Make toggleMenu available for inline HTML onclick
let toggleMenu;

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // NAVBAR TRANSPARENT → SOLID ON SCROLL
  // ------------------------------------------------------------
  const nav = document.querySelector(".dt-nav");

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
  const closeBtn = document.querySelector(".dt-menu-close");
  const body = document.body;

  toggleMenu = function () {
    if (!menu) return;

    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");

    if (menu.classList.contains("active")) animateMenuLinks();
  };

  // Click handlers (always bound once)
  if (hamburger) hamburger.onclick = toggleMenu;
  if (closeBtn) closeBtn.onclick = toggleMenu;

  // CLICK OUTSIDE MENU TO CLOSE
  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("active")) return;

    const insideMenu = menu.contains(e.target);
    const clickedBurger = hamburger.contains(e.target);

    if (!insideMenu && !clickedBurger) toggleMenu();
  });

  // Link stagger animation
  function animateMenuLinks() {
    const links = document.querySelectorAll(".dt-menu-links a");

    links.forEach((link, i) => {
      link.classList.remove("animate-in");
      setTimeout(() => link.classList.add("animate-in"), 90 * i);
    });
  }


  // ------------------------------------------------------------
  // NAV TEXT SHIMMER — SAFE + DOES NOT BLOCK HAMBURGER
  // ------------------------------------------------------------
  const navText = document.querySelector(".dt-nav-text");
  if (navText) {
    // add shimmer AFTER DOM paints to avoid click-block
    requestAnimationFrame(() => {
      navText.classList.add("shimmer-active");
    });
  }


  // ------------------------------------------------------------
  // FADE-IN OBSERVER
  // ------------------------------------------------------------
  const fadeItems = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeItems.forEach((el) => fadeObserver.observe(el));


  // ------------------------------------------------------------
  // PRODUCT FILTERS
  // ------------------------------------------------------------
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".product-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      cards.forEach((card) => {
        const cat = card.dataset.category;
        card.classList.toggle("is-hidden", filter !== "all" && filter !== cat);
      });
    });
  });


  // ------------------------------------------------------------
  // CAPSULE CAROUSEL
  // ------------------------------------------------------------
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn-prev");
  const next = document.querySelector(".carousel-btn-next");

  if (track && prev && next) {
    const scrollAmount = () => track.clientWidth * 0.8;

    prev.onclick = () =>
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });

    next.onclick = () =>
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  }


  // ------------------------------------------------------------
  // QUICK ADD (TEMP)
  // ------------------------------------------------------------
  document.querySelectorAll(".quick-add").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const item = btn.closest(".product-card")?.querySelector("h3")?.textContent;
      console.log("Quick View:", item);
    });
  });
});


// ============================================================
// MOBILE HERO SLIDER (<900px only)
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
