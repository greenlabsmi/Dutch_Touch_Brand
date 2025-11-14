// ============================================================
// DUTCH TOUCH • STRAINS PAGE JS
// Menu toggle • Filters • A–Z sort • Modal details
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  // ------------------------------------------------------------
  // SLIDE-OUT MENU (same behavior as home/apparel)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const menuToggle = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");
  const body = document.body;

  function toggleMenu() {
    if (!menu) return;
    menu.classList.toggle("active");
    body.classList.toggle("no-scroll");
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


  // ------------------------------------------------------------
  // FILTERS + SORT
  // ------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".strain-filter");
  const grid = document.querySelector(".strain-grid");
  const cards = Array.from(document.querySelectorAll(".strain-card"));

  // Store original order so we can restore after A–Z
  const originalOrder = [...cards];

  function restoreOriginalOrder() {
    originalOrder.forEach(card => grid.appendChild(card));
  }

  function applyFilter(filter) {
    if (!grid) return;

    // Reset visibility first
    cards.forEach(card => {
      card.classList.remove("is-hidden");
    });

    // Award filter
    if (filter === "award") {
      restoreOriginalOrder();
      cards.forEach(card => {
        const isAward = card.dataset.award === "true";
        if (!isAward) {
          card.classList.add("is-hidden");
        }
      });
      return;
    }

    // A–Z sort
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
        if (type !== filter) {
          card.classList.add("is-hidden");
        }
      });
      return;
    }

    // Default: show all in original order
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
  // MODAL DETAILS
  // ------------------------------------------------------------
  const modal = document.createElement("div");
  modal.className = "strain-modal";
  modal.id = "strainModal";

  modal.innerHTML = `
    <div class="strain-modal-dialog">
      <button class="strain-modal-close" aria-label="Close">×</button>
      <h3 class="strain-modal-name" id="modalStrainName"></h3>
      <p class="strain-modal-meta" id="modalStrainType"></p>
      <p class="strain-modal-section"><span>Lineage:</span> <span id="modalStrainLineage"></span></p>
      <p class="strain-modal-section"><span>Flavor:</span> <span id="modalStrainFlavor"></span></p>
      <p class="strain-modal-section"><span>Effects:</span> <span id="modalStrainEffects"></span></p>
    </div>
  `;
  document.body.appendChild(modal);

  const modalCloseBtn = modal.querySelector(".strain-modal-close");
  const modalName = modal.querySelector("#modalStrainName");
  const modalType = modal.querySelector("#modalStrainType");
  const modalLineage = modal.querySelector("#modalStrainLineage");
  const modalFlavor = modal.querySelector("#modalStrainFlavor");
  const modalEffects = modal.querySelector("#modalStrainEffects");

  function openModalForCard(card) {
    modalName.textContent = card.dataset.name || "";
    const type = (card.dataset.type || "").toUpperCase();
    const award = card.dataset.award === "true" ? " • Award Winner" : "";
    modalType.textContent = `${type}${award}`;
    modalLineage.textContent = card.dataset.lineage || "–";
    modalFlavor.textContent = card.dataset.flavor || "–";
    modalEffects.textContent = card.dataset.effects || "–";

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
    if (!dialog.contains(e.target)) {
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

