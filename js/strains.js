/* ============================================================
   DUTCH TOUCH GENETICS
   STRAINS PAGE — FULL JS REPLACEMENT
   Handles: Nav, Menu, Filters, Search, Modal
   Scoped strictly to: body.dt-strains-page
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-strains-page")) return;

  /* ============================================================
     NAV SCROLL
  ============================================================ */
  const nav = document.getElementById("dtNav");

  function updateNav() {
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }

  updateNav();
  window.addEventListener("scroll", updateNav);


  /* ============================================================
     SLIDE-OUT MENU
  ============================================================ */
  const menu = document.getElementById("dt-menu");
  const menuLinks = document.querySelectorAll(".dt-menu-links a");
  const hamburger = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");

  hamburger.addEventListener("click", () => {
    menu.classList.add("active");

    // Animate links with delay
    menuLinks.forEach((link, i) => {
      setTimeout(() => link.classList.add("revealed"), 120 + i * 80);
    });
  });

  menuClose.addEventListener("click", () => {
    menu.classList.remove("active");
    menuLinks.forEach(link => link.classList.remove("revealed"));
  });


  /* ============================================================
     LOAD STRAIN CARD IMAGES INTO .strain-image DIVS
  ============================================================ */
  const strainCards = document.querySelectorAll(".strain-card");

  strainCards.forEach(card => {
    const imgPath = card.dataset.image;
    const imgDiv = card.querySelector(".strain-image");
    if (imgDiv && imgPath) {
      imgDiv.style.backgroundImage = `url('${imgPath}')`;
    }
  });


  /* ============================================================
     FILTERS
  ============================================================ */
  const filterButtons = document.querySelectorAll(".strain-filter");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Highlight active filter
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      applyFilters();
    });
  });


  /* ============================================================
     SEARCH
     Matches: name, flavor, terpene list, type, lineage
  ============================================================ */
  const searchInput = document.getElementById("strainSearch");

  searchInput.addEventListener("input", () => {
    applyFilters();
  });


  /* ============================================================
     COMBINED FILTER FUNCTION
  ============================================================ */
  function applyFilters() {
    const activeFilter = document.querySelector(".strain-filter.is-active").dataset.filter;
    const searchValue = searchInput.value.toLowerCase().trim();

    strainCards.forEach(card => {
      let isVisible = true;

      // ---------- FILTER LOGIC ----------
      const type = card.dataset.type.toLowerCase();
      const award = card.dataset.award === "true";
      const name = card.dataset.name.toLowerCase();
      const flavor = (card.dataset.flavor || "").toLowerCase();
      const lineage = (card.dataset.lineage || "").toLowerCase();
      const terps = (card.dataset.terps || "").toLowerCase();

      // FILTER by type/award/A-Z
      if (activeFilter === "award" && !award) isVisible = false;
      if (activeFilter === "sativa" && type !== "sativa") isVisible = false;
      if (activeFilter === "hybrid" && type !== "hybrid") isVisible = false;
      if (activeFilter === "indica" && type !== "indica") isVisible = false;

      if (activeFilter === "az") {
        // Force alphabetical sorting (implemented below)
      }

      // SEARCH
      if (searchValue.length > 0) {
        const haystack =
          name +
          flavor +
          lineage +
          terps +
          type;

        if (!haystack.includes(searchValue)) {
          isVisible = false;
        }
      }

      // APPLY VISIBILITY
      if (isVisible) card.classList.remove("is-hidden");
      else card.classList.add("is-hidden");
    });

    // A–Z SORTING
    if (activeFilter === "az") sortAZ();
  }


  /* ============================================================
     SORT A–Z (moves DOM elements)
  ============================================================ */
  function sortAZ() {
    const grid = document.querySelector(".strain-grid");
    const cardsArr = Array.from(strainCards);

    cardsArr.sort((a, b) => {
      const nameA = a.dataset.name.toLowerCase();
      const nameB = b.dataset.name.toLowerCase();
      return nameA.localeCompare(nameB);
    });

    cardsArr.forEach(card => grid.appendChild(card));
  }


  /* ============================================================
     MODAL — Builds content from data attributes
  ============================================================ */
  let modal = null;

  function buildModal(card) {
    if (modal) modal.remove();

    modal = document.createElement("div");
    modal.classList.add("strain-modal");

    modal.innerHTML = `
      <div class="strain-modal-dialog">
        <button class="strain-modal-close">&times;</button>

        <div class="strain-modal-header">
          <h3>${card.dataset.name}</h3>
          <p>${card.dataset.type}</p>
        </div>

        <div class="strain-modal-layout">

          <div class="strain-modal-media">
            <div class="strain-modal-image-frame">
              <img src="${card.dataset.image}" alt="${card.dataset.name}">
            </div>
            <div class="strain-modal-tagline">
              ${card.dataset.flavor || ""}
            </div>
          </div>

          <div class="strain-modal-body">

            <div class="strain-modal-section">
              <h4>Lineage</h4>
              <p><span class="label">Mom:</span> ${card.dataset.mom || "Unknown"}<br>
                 <span class="label">Dad:</span> ${card.dataset.dad || "Unknown"}</p>
            </div>

            <div class="strain-modal-section">
              <h4>Effects</h4>
              <p>${card.dataset.effects || ""}</p>
            </div>

            <div class="strain-modal-section">
              <h4>Accolades</h4>
              <p>${card.dataset.accolades || "—"}</p>
            </div>

            <div class="strain-modal-section">
              <h4>Top Terpenes</h4>
              <p>${card.dataset.terps || ""}</p>
            </div>

            <div class="strain-modal-section">
              <h4>Review</h4>
              <p class="strain-modal-quote">${card.dataset.review || ""}</p>
            </div>

          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.classList.add("open");

    // Close events
    modal.querySelector(".strain-modal-close").addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
      if (e.target === modal) closeModal();
    });
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    setTimeout(() => modal.remove(), 200);
  }


  /* ============================================================
     OPEN MODAL ON CARD CLICK
  ============================================================ */
  strainCards.forEach(card => {
    card.addEventListener("click", () => buildModal(card));
  });

});
