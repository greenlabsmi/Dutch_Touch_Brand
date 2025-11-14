// IntersectionObserver for fade-in elements
document.addEventListener("DOMContentLoaded", () => {
  const fadeEls = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  fadeEls.forEach(el => observer.observe(el));

  // Filter buttons
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

  // Carousel scroll buttons
  const track = document.querySelector(".carousel-track");
  const prev = document.querySelector(".carousel-btn-prev");
  const next = document.querySelector(".carousel-btn-next");

  if (track && prev && next) {
    const scrollAmount = () => track.clientWidth * 0.8;

    prev.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
    });

    next.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount(), behavior: "smooth" });
    });
  }

  // Quick-add buttons (for now just log / later can hook to cart or product page)
  const quickAdds = document.querySelectorAll(".quick-add");
  quickAdds.forEach(btn => {
    btn.addEventListener("click", e => {
      e.preventDefault();
      const card = btn.closest(".product-card");
      const name = card?.querySelector("h3")?.textContent?.trim() || "Item";
      console.log("Quick view:", name);
      // later: window.location.href = "product.html?item=" + encodeURIComponent(name);
    });
  });
});
