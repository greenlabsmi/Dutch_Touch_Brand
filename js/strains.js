// ============================================================
// DUTCH TOUCH • STRAINS PAGE JS
// Nav scroll + shimmer • Menu • Filters • Modal details
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-strains-page")) return;

  // ------------------------------------------------------------
  // NAVBAR SCROLL + SHIMMER
  // ------------------------------------------------------------
  const nav = document.getElementById("dtNav");
  const navText = document.querySelector(".dt-nav-text");

  function updateNavOnScroll() {
    if (!nav) return;
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll);

  // slow shimmer
  if (navText) {
    setTimeout(() => {
      navText.classList.add("shimmer-active");
    }, 80);
  }

  // ------------------------------------------------------------
  // SLIDE-OUT MENU (MATCHES HOME/APPAREL BEHAVIOR)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const menuToggle = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");

  function toggleMenu() {
    if (!menu) return;
    const isOpen = menu.classList.toggle("active");
    body.classList.toggle("no-scroll", isOpen);

    if (isOpen) revealMenuLinks();
    else resetMenuLinks();
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu on click outside
  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("active")) return;

    const clickedInsideMenu = menu.contains(e.target);
    const clickedHamburger = menuToggle && menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedHamburger) {
      toggleMenu();
    }
  });

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

  // ------------------------------------------------------------
  // FILTERS + SORT
  // ------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".strain-filter");
  const grid = document.querySelector(".strain-grid");
  const cards = Array.from(document.querySelectorAll(".strain-card"));
  const originalOrder = [...cards]; // preserve original

  function restoreOriginalOrder() {
    if (!grid) return;
    originalOrder.forEach(card => grid.appendChild(card));
  }

  function applyFilter(filter) {
    if (!grid) return;

    cards.forEach(card => card.classList.remove("is-hidden"));

    // Award filter
    if (filter === "award") {
      restoreOriginalOrder();
      cards.forEach(card => {
        const isAward = card.dataset.award === "true";
        if (!isAward) card.classList.add("is-hidden");
      });
      return;
    }

    // A–Z
    if (filter === "az") {
      cards.forEach(card => card.classList.remove("is-hidden"));
      const sorted = [...cards].sort((a, b) => {
        const nameA = (a.dataset.name || "").toLowerCase();
        const nameB = (b.dataset.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
      sorted.forEach(card => grid.appendChild(card));
      return;
    }

    // Type filters
    if (filter === "sativa" || filter === "hybrid" || filter === "indica") {
      restoreOriginalOrder();
      cards.forEach(card => {
        const type = (card.dataset.type || "").toLowerCase();
        if (type !== filter) card.classList.add("is-hidden");
      });
      return;
    }

    // All
    if (filter === "all") {
      restoreOriginalOrder();
      return;
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(filter);
    });
  });

  // ------------------------------------------------------------
  // MODAL DETAILS — SMOOTH, IMAGE + GENETICS + QUOTE
  // ------------------------------------------------------------
  const modal = document.createElement("div");
  modal.className = "strain-modal";
  modal.id = "strainModal";

  modal.innerHTML = `
    <div class="strain-modal-dialog">
      <button class="strain-modal-close" aria-label="Close">×</button>

      <div class="strain-modal-header">
        <h3 class="strain-modal-name" id="modalStrainName"></h3>
        <p class="strain-modal-meta" id="modalStrainType"></p>
      </div>

      <div class="strain-modal-layout">
        <div class="strain-modal-media">
          <div class="strain-modal-image-frame">
            <img id="modalStrainImage" alt="">
          </div>
          <p class="strain-modal-tagline" id="modalStrainTagline"></p>
        </div>

        <div class="strain-modal-body">

          <div class="strain-modal-section">
            <h4>Genetics</h4>
            <p>
              <span class="label">Mother</span>
              <span id="modalStrainMom"></span>
            </p>
            <p>
              <span class="label">Father</span>
              <span id="modalStrainDad"></span>
            </p>
            <p>
              <span class="label">Lineage</span>
              <span id="modalStrainLineage"></span>
            </p>
          </div>

          <div class="strain-modal-section">
            <h4>Flavor &amp; Aroma</h4>
            <p id="modalStrainFlavor"></p>
          </div>

          <div class="strain-modal-section">
            <h4>Effects</h4>
            <p id="modalStrainEffects"></p>
          </div>

          <div class="strain-modal-section">
            <h4>Accolades</h4>
            <p id="modalStrainAccolades"></p>
          </div>

          <div class="strain-modal-section">
            <h4>What customers say</h4>
            <p class="strain-modal-quote" id="modalStrainReview"></p>
          </div>

        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalCloseBtn   = modal.querySelector(".strain-modal-close");
  const modalName       = modal.querySelector("#modalStrainName");
  const modalType       = modal.querySelector("#modalStrainType");
  const modalLineage    = modal.querySelector("#modalStrainLineage");
  const modalFlavor     = modal.querySelector("#modalStrainFlavor");
  const modalEffects    = modal.querySelector("#modalStrainEffects");
  const modalMom        = modal.querySelector("#modalStrainMom");
  const modalDad        = modal.querySelector("#modalStrainDad");
  const modalAccolades  = modal.querySelector("#modalStrainAccolades");
  const modalReview     = modal.querySelector("#modalStrainReview");
  const modalTagline    = modal.querySelector("#modalStrainTagline");
  const modalImageEl    = modal.querySelector("#modalStrainImage");

  function openModalForCard(card) {
    const name   = card.dataset.name || "";
    const type   = (card.dataset.type || "").toUpperCase();
    const award  = card.dataset.award === "true" ? " • Award Winner" : "";
    const mom    = card.dataset.mom || "Coming soon";
    const dad    = card.dataset.dad || "Coming soon";
    const lineage = card.dataset.lineage || "–";
    const flavor  = card.dataset.flavor || "–";
    const effects = card.dataset.effects || "–";
    const accolades = card.dataset.accolades || "Details coming soon.";
    const review    = card.dataset.review || "";
    const imageSrc  = card.dataset.image || "";
    const notesText = card.querySelector(".strain-notes")?.textContent || "";

    modalName.textContent = name;
    modalType.textContent = `${type}${award}`;
    modalMom.textContent = mom;
    modalDad.textContent = dad;
    modalLineage.textContent = lineage;
    modalFlavor.textContent = flavor;
    modalEffects.textContent = effects;
    modalAccolades.textContent = accolades;
    modalReview.textContent = review || notesText;

    modalTagline.textContent = notesText;

    if (imageSrc) {
      modalImageEl.src = imageSrc;
      modalImageEl.alt = `${name} flower`;
    } else {
      modalImageEl.removeAttribute("src");
      modalImageEl.alt = "";
    }

    modal.classList.add("open");
    body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.classList.remove("open");
    body.classList.remove("no-scroll");
  }

  // Click card to open modal
  cards.forEach(card => {
    card.addEventListener("click", () => openModalForCard(card));
  });

  // Close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }

  // Click outside dialog to close
  modal.addEventListener("click", (e) => {
    const dialog = modal.querySelector(".strain-modal-dialog");
    if (dialog && !dialog.contains(e.target)) {
      closeModal();
    }
  });

  // Escape key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
});
