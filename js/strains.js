// ============================================================
// DUTCH TOUCH • STRAINS PAGE JS
// Nav scroll • Menu • Filters • Modal w/ terps + QR support
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-strains-page")) return;

  let modal = null; // declare up front so we can safely reference in functions

  // ------------------------------------------------------------
  // NAV: SCROLL BACKGROUND (MATCHES HOME/APPAREL)
  // ------------------------------------------------------------
  const nav = document.querySelector(".dt-nav");

  function updateNavOnScroll() {
    if (!nav) return;
    if (window.scrollY > 10) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }

  updateNavOnScroll();
  window.addEventListener("scroll", updateNavOnScroll);

  // ------------------------------------------------------------
  // SLIDE-OUT MENU (MATCHES HOME/APPAREL FEEL)
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");

  function revealMenuLinks() {
    if (!menu) return;
    const links = menu.querySelectorAll(".dt-menu-links a");
    links.forEach((link, i) => {
      link.classList.remove("revealed");
      setTimeout(() => link.classList.add("revealed"), 120 * i);
    });
  }

  function resetMenuLinks() {
    if (!menu) return;
    const links = menu.querySelectorAll(".dt-menu-links a");
    links.forEach((link) => link.classList.remove("revealed"));
  }

  function toggleMenu() {
    if (!menu) return;
    const willOpen = !menu.classList.contains("active");
    menu.classList.toggle("active");

    if (willOpen) {
      body.classList.add("no-scroll");
      revealMenuLinks();
    } else {
      resetMenuLinks();
      // Only remove no-scroll if modal isn't open
      if (!modal || !modal.classList.contains("open")) {
        body.classList.remove("no-scroll");
      }
    }
  }

  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
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

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("active")) return;
    const clickedInsideMenu = menu.contains(e.target);
    const clickedHamburger = hamburger && hamburger.contains(e.target);
    if (!clickedInsideMenu && !clickedHamburger) {
      toggleMenu();
    }
  });

  // ------------------------------------------------------------
  // FILTERS + SORT (AWARD, A–Z, TYPE)
  // ------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".strain-filter");
  const grid = document.querySelector(".strain-grid");
  const cards = Array.from(document.querySelectorAll(".strain-card"));
  const originalOrder = [...cards];

  function restoreOriginalOrder() {
    if (!grid) return;
    originalOrder.forEach((card) => grid.appendChild(card));
  }

  function applyFilter(filter) {
    if (!grid) return;

    cards.forEach((card) => {
      card.classList.remove("is-hidden");
    });

    // Award winners only
    if (filter === "award") {
      restoreOriginalOrder();
      cards.forEach((card) => {
        const isAward = card.dataset.award === "true";
        if (!isAward) card.classList.add("is-hidden");
      });
      return;
    }

    // A–Z sort
    if (filter === "az") {
      cards.forEach((card) => card.classList.remove("is-hidden"));
      const sorted = [...cards].sort((a, b) => {
        const nameA = (a.dataset.name || "").toLowerCase();
        const nameB = (b.dataset.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
      sorted.forEach((card) => grid.appendChild(card));
      return;
    }

    // Type filters
    if (filter === "sativa" || filter === "hybrid" || filter === "indica") {
      restoreOriginalOrder();
      cards.forEach((card) => {
        const type = (card.dataset.type || "").toLowerCase();
        if (type !== filter) {
          card.classList.add("is-hidden");
        }
      });
      return;
    }

    // Default: all
    if (filter === "all") {
      restoreOriginalOrder();
      return;
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(filter);
    });
  });

  // ------------------------------------------------------------
  // MODAL DETAILS — IMAGE + LINEAGE + TERPS + QUOTE
  // ------------------------------------------------------------

  modal = document.createElement("div");
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
        <!-- LEFT: IMAGE + ACCOLADES -->
        <aside class="strain-modal-media">
          <div class="strain-modal-image-frame">
            <img id="modalStrainImage" src="" alt="">
          </div>
          <p class="strain-modal-tagline" id="modalStrainAccolades"></p>
        </aside>

        <!-- RIGHT: CONTENT -->
        <section class="strain-modal-body">
          <!-- Lineage section -->
          <div class="strain-modal-section" id="modalLineageSection">
            <h4>Lineage</h4>
            <p><span class="label">Mother</span><span id="modalStrainMother"></span></p>
            <p><span class="label">Father</span><span id="modalStrainFather"></span></p>
            <p><span class="label">Overview</span><span id="modalStrainLineage"></span></p>
          </div>

          <!-- Flavor -->
          <div class="strain-modal-section" id="modalFlavorSection">
            <h4>Flavor</h4>
            <p id="modalStrainFlavor"></p>
          </div>

          <!-- Effects -->
          <div class="strain-modal-section" id="modalEffectsSection">
            <h4>Effects</h4>
            <p id="modalStrainEffects"></p>
          </div>

          <!-- Terps (blank but ready to fill) -->
          <div class="strain-modal-section" id="modalTerpsSection">
            <h4>Top 3 Terps</h4>

            <div class="terp-row" data-terp-row="1">
              <div class="terp-label" id="modalTerp1Name"></div>
              <div class="terp-bar">
                <div class="terp-bar-fill" id="modalTerp1Bar"></div>
              </div>
              <div class="terp-percent" id="modalTerp1Pct"></div>
            </div>

            <div class="terp-row" data-terp-row="2">
              <div class="terp-label" id="modalTerp2Name"></div>
              <div class="terp-bar">
                <div class="terp-bar-fill" id="modalTerp2Bar"></div>
              </div>
              <div class="terp-percent" id="modalTerp2Pct"></div>
            </div>

            <div class="terp-row" data-terp-row="3">
              <div class="terp-label" id="modalTerp3Name"></div>
              <div class="terp-bar">
                <div class="terp-bar-fill" id="modalTerp3Bar"></div>
              </div>
              <div class="terp-percent" id="modalTerp3Pct"></div>
            </div>
          </div>

          <!-- Quote / what customers say -->
          <div class="strain-modal-section" id="modalQuoteSection">
            <h4>What People Say</h4>
            <p class="strain-modal-quote" id="modalStrainQuote"></p>
          </div>
        </section>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const modalDialog = modal.querySelector(".strain-modal-dialog");
  const modalCloseBtn = modal.querySelector(".strain-modal-close");

  const modalName = modal.querySelector("#modalStrainName");
  const modalType = modal.querySelector("#modalStrainType");
  const modalImage = modal.querySelector("#modalStrainImage");
  const modalAccolades = modal.querySelector("#modalStrainAccolades");

  const modalMother = modal.querySelector("#modalStrainMother");
  const modalFather = modal.querySelector("#modalStrainFather");
  const modalLineage = modal.querySelector("#modalStrainLineage");

  const modalFlavor = modal.querySelector("#modalStrainFlavor");
  const modalEffects = modal.querySelector("#modalStrainEffects");

  const modalQuote = modal.querySelector("#modalStrainQuote");
  const modalQuoteSection = modal.querySelector("#modalQuoteSection");

  const modalTerpsSection = modal.querySelector("#modalTerpsSection");

  function fillTerpRow(index, card) {
    const row = modal.querySelector(`[data-terp-row="${index}"]`);
    if (!row) return;

    const nameEl = row.querySelector(".terp-label");
    const pctEl = row.querySelector(".terp-percent");
    const barFill = row.querySelector(".terp-bar-fill");

    const nameAttr = card.dataset[`terp${index}`];
    const pctAttr = card.dataset[`terp${index}pct`];

    if (!nameAttr && !pctAttr) {
      row.style.display = "none";
      nameEl.textContent = "";
      pctEl.textContent = "";
      if (barFill) barFill.style.width = "0%";
      return;
    }

    row.style.display = "flex";
    nameEl.textContent = nameAttr || "";
    pctEl.textContent = pctAttr ? `${pctAttr}%` : "";

    const pctNum = parseFloat(pctAttr);
    if (!isNaN(pctNum)) {
      const clamped = Math.max(0, Math.min(100, pctNum));
      barFill.style.width = `${clamped}%`;
    } else {
      barFill.style.width = "0%";
    }
  }

  function openModalForCard(card) {
    // Name + type/award
    modalName.textContent = card.dataset.name || "";
    const type = (card.dataset.type || "").toUpperCase();
    const award = card.dataset.award === "true" ? " • Award Winner" : "";
    modalType.textContent = `${type}${award}`;

    // Image
    const imgSrc = card.dataset.image || "assets/img/strains/placeholder.png";
    modalImage.src = imgSrc;
    modalImage.alt = card.dataset.name || "Strain";

    // Accolades/tagline
    const acc = card.dataset.accolades || "";
    modalAccolades.textContent = acc;
    modalAccolades.style.display = acc ? "block" : "none";

    // Lineage + parents
    const mother = card.dataset.mom || card.dataset.mother || "";
    const father = card.dataset.dad || card.dataset.father || "";
    const lineage = card.dataset.lineage || "";

    modalMother.textContent = mother;
    modalFather.textContent = father;
    modalLineage.textContent = lineage;

    // Flavor/effects
    modalFlavor.textContent = card.dataset.flavor || "";
    modalEffects.textContent = card.dataset.effects || "";

    // Quote (what customers say)
    const quote = card.dataset.review || card.dataset.quote || "";
    if (quote) {
      modalQuote.textContent = quote;
      modalQuoteSection.style.display = "block";
    } else {
      modalQuote.textContent = "";
      modalQuoteSection.style.display = "none";
    }

    // Terps (blank but ready) – if you add:
    // data-terp1="Limonene" data-terp1pct="2.1"
    // they will show automatically.
    fillTerpRow(1, card);
    fillTerpRow(2, card);
    fillTerpRow(3, card);

    const anyTerpVisible = Array.from(
      modalTerpsSection.querySelectorAll(".terp-row")
    ).some((row) => row.style.display !== "none");

    modalTerpsSection.style.display = anyTerpVisible ? "block" : "none";

    // Open modal
    modal.classList.add("open");
    body.classList.add("no-scroll");
  }

  function closeModal() {
    modal.classList.remove("open");
    // If menu not open, allow scroll again
    if (!menu || !menu.classList.contains("active")) {
      body.classList.remove("no-scroll");
    }
  }

  // Click card to open modal
  cards.forEach((card) => {
    card.addEventListener("click", () => openModalForCard(card));
  });

  // Close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeModal();
    });
  }

  // Click outside dialog to close
  modal.addEventListener("click", (e) => {
    if (!modalDialog.contains(e.target)) {
      closeModal();
    }
  });

  // Escape key close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // ------------------------------------------------------------
  // QR SUPPORT: open a strain from the URL hash (e.g. #lilac-diesel)
  // ------------------------------------------------------------
  const hash = window.location.hash.replace("#", "").trim();
  if (hash) {
    const bySlug = cards.find((c) => {
      const slug = (c.dataset.slug || "").toLowerCase();
      const nameSlug = (c.dataset.name || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
      const target = hash.toLowerCase();
      return slug === target || nameSlug === target;
    });

    if (bySlug) {
      bySlug.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => openModalForCard(bySlug), 500);
    }
  }
});
