// ============================================================
// DUTCH TOUCH • APPAREL PAGE JS
// Smooth fade-ins, filters, carousel, mobile menu
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

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
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px"
    }
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
        if (filter === "all" || filter === cat) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });


  // ------------------------------------------------------------
  // CAPSULE CAROUSEL  (NON-GLITCH VERSION)
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
  // QUICK-ADD (placeholder behavior)
  // ------------------------------------------------------------
  const quickAdds = document.querySelectorAll(".quick-add");
  quickAdds.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      const name = card?.querySelector("h3")?.textContent || "Item";
      console.log("Quick View:", name);

      // Future:
      // window.location.href = `product.html?item=${encodeURIComponent(name)}`;
    });
  });


  // ------------------------------------------------------------
  // MOBILE SLIDE-OUT MENU
  // ------------------------------------------------------------
  const menu = document.querySelector("#dt-menu");
  const menuToggle = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");

  if (menu && menuToggle) {
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  }

  if (menu && menuClose) {
    menuClose.addEventListener("click", () => {
      menu.classList.remove("active");
    });
  }

  // Close menu on outside click
  document.addEventListener("click", (e) => {
    if (menu.classList.contains("active")) {
      const insideMenu = menu.contains(e.target);
      const isToggle = menuToggle.contains(e.target);
      if (!insideMenu && !isToggle) {
        menu.classList.remove("active");
      }
    }
  });

});
