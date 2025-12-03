// ============================================================
// DUTCH TOUCH • STRAINS PAGE JS
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-strains-page")) return;

  let modal = null;

  // ------------------------------------------------------------
  // NAV SCROLL
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
  // SLIDE-OUT MENU
  // ------------------------------------------------------------
  const menu = document.getElementById("dt-menu");
  const hamburger = document.querySelector(".dt-nav-hamburger");
  const menuClose = document.querySelector(".dt-menu-close");

  function revealMenuLinks() {
    const links = menu.querySelectorAll(".dt-menu-links a");
    links.forEach((link, i) => {
      link.classList.remove("revealed");
      setTimeout(() => link.classList.add("revealed"), 120 * i);
    });
  }

  function resetMenuLinks() {
    const links = menu.querySelectorAll(".dt-menu-links a");
    links.forEach((link) => link.classList.remove("revealed"));
  }

  function toggleMenu() {
    const willOpen = !menu.classList.contains("active");
    menu.classList.toggle("active");

    if (willOpen) {
      body.classList.add("no-scroll");
      revealMenuLinks();
    } else {
      resetMenuLinks();
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

  document.addEventListener("click", (e) => {
    if (!menu || !menu.classList.contains("active")) return;
    const insideMenu = menu.contains(e.target);
    const onHamburger = hamburger && hamburger.contains(e.target);
    if (!insideMenu && !onHamburger) toggleMenu();
  });

  // ------------------------------------------------------------
  // FILTERS
  // ------------------------------------------------------------
  const filterButtons = document.querySelectorAll(".strain-filter");
  const grid = document.querySelector(".strain-grid");
  const cards = Array.from(document.querySelectorAll(".strain-card"));
  const originalOrder = [...cards];

  function restoreOriginalOrder() {
    originalOrder.forEach((card) => grid.appendChild(card));
  }

  function applyFilter(filter) {
    cards.forEach((c) => c.classList.remove("is-hidden"));

    if (filter === "award") {
      restoreOriginalOrder();
      cards.forEach((c) => {
        if (c.dataset.award !== "true") c.classList.add("is-hidden");
      });
      return;
    }

    if (filter === "az") {
      const sorted = [...cards].sort((a, b) => {
        const A = (a.dataset.name || "").toLowerCase();
        const B = (b.dataset.name || "").toLowerCase();
        return A.localeCompare(B);
      });
      sorted.forEach((card) => grid.appendChild(card));
      return;
    }

    if (["sativa", "hybrid", "indica"].includes(filter)) {
      restoreOriginalOrder();
      cards.forEach((c) => {
        if ((c.dataset.type || "").toLowerCase() !== filter) {
          c.classList.add("is-hidden");
        }
      });
      return;
    }

    if (filter === "all") {
      restoreOriginalOrder();
    }
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.filter);
    });
  });

  // ------------------------------------------------------------
// SEARCH BAR
// ------------------------------------------------------------
const searchInput = document.getElementById("strainSearch");

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    cards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const notes = (card.dataset.notes || "").toLowerCase();
      const type = (card.dataset.type || "").toLowerCase();

      const match =
        name.includes(query) ||
        type.includes(query) ||
        notes.includes(query);

      card.classList.toggle("is-hidden", !match);
    });
  });
}

  // ------------------------------------------------------------
  // MODAL SETUP
  // ------------------------------------------------------------
  modal = document.createElement("div");
  modal.className = "strain-modal";
  modal.id = "strainModal";

  modal.innerHTML = `
    <div class="strain-modal-dialog">
      <button class="strain-modal-close" aria-label="Close">×</button>

      <div class="strain-modal-header">
        <h3 id="modalStrainName"></h3>
        <p id="modalStrainType"></p>
      </div>

      <div class="strain-modal-layout">
        <aside class="strain-modal-media">
          <div class="strain-modal-image-frame">
            <img id="modalStrainImage" src="" alt="">
          </div>
          <p id="modalStrainAccolades" class="strain-modal-tagline"></p>
        </aside>

        <section class="strain-modal-body">

          <div class="strain-modal-section">
            <h4>Lineage</h4>
            <p><span class="label">Mother</span><span id="modalStrainMother"></span></p>
            <p><span class="label">Father</span><span id="modalStrainFather"></span></p>
            <p><span class="label">Overview</span><span id="modalStrainLineage"></span></p>
          </div>

          <div class="strain-modal-section">
            <h4>Flavor</h4>
            <p id="modalStrainFlavor"></p>
          </div>

          <div class="strain-modal-section">
            <h4>Effects</h4>
            <p id="modalStrainEffects"></p>
          </div>

          <div class="strain-modal-section" id="modalTerpsSection">
            <h4>Top 3 Terps</h4>

            <div class="terp-row" data-terp-row="1">
              <div class="terp-label" id="modalTerp1Name"></div>
              <div class="terp-bar"><div class="terp-bar-fill" id="modalTerp1Bar"></div></div>
              <div class="terp-percent" id="modalTerp1Pct"></div>
            </div>

            <div class="terp-row" data-terp-row="2">
              <div class="terp-label" id="modalTerp2Name"></div>
              <div class="terp-bar"><div class="terp-bar-fill" id="modalTerp2Bar"></div></div>
              <div class="terp-percent" id="modalTerp2Pct"></div>
            </div>

            <div class="terp-row" data-terp-row="3">
              <div class="terp-label" id="modalTerp3Name"></div>
              <div class="terp-bar"><div class="terp-bar-fill" id="modalTerp3Bar"></div></div>
              <div class="terp-percent" id="modalTerp3Pct"></div>
            </div>
          </div>

          <div class="strain-modal-section" id="modalQuoteSection">
            <h4>What People Say</h4>
            <p id="modalStrainQuote" class="strain-modal-quote"></p>
          </div>

        </section>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Modal element refs
  const modalDialog = modal.querySelector(".strain-modal-dialog");
  const modalCloseBtn = modal.querySelector(".strain-modal-close");

  const modalName = modal.querySelector("#modalStrainName");
  const modalType = modal.querySelector("#modalStrainType");
  const modalImage = modal.querySelector("#modalStrainImage");
  const modalAcc = modal.querySelector("#modalStrainAccolades");
  const modalMother = modal.querySelector("#modalStrainMother");
  const modalFather = modal.querySelector("#modalStrainFather");
  const modalLineage = modal.querySelector("#modalStrainLineage");
  const modalFlavor = modal.querySelector("#modalStrainFlavor");
  const modalEffects = modal.querySelector("#modalStrainEffects");
  const modalQuote = modal.querySelector("#modalStrainQuote");
  const modalQuoteSection = modal.querySelector("#modalQuoteSection");
  const modalTerpsSection = modal.querySelector("#modalTerpsSection");

  // ------------------------------------------------------------
  // TERP SYSTEM
  // ------------------------------------------------------------
  function fillTerpRow(index, card) {
    const row = modal.querySelector(`[data-terp-row="${index}"]`);
    if (!row) return;

    const name = card.dataset[`terp${index}`];
    const pct = card.dataset[`terp${index}pct`];

    const label = row.querySelector(".terp-label");
    const percent = row.querySelector(".terp-percent");
    const bar = row.querySelector(".terp-bar-fill");

    if (!name && !pct) {
      row.style.display = "none";
      return;
    }

    row.style.display = "flex";
    label.textContent = name || "";
    percent.textContent = pct ? `${pct}%` : "";

    const numeric = parseFloat(pct);
    bar.style.width = !isNaN(numeric) ? `${numeric}%` : "0%";
  }

  // ------------------------------------------------------------
  // OPEN MODAL
  // ------------------------------------------------------------
  function openModal(card) {
    modalName.textContent = card.dataset.name || "";

    const type = (card.dataset.type || "").toUpperCase();
    const award = card.dataset.award === "true" ? " • Award Winner" : "";
    modalType.textContent = `${type}${award}`;

    modalImage.src = card.dataset.image || "assets/img/strains/placeholder.png";
    modalAcc.textContent = card.dataset.accolades || "";
    modalAcc.style.display = modalAcc.textContent ? "block" : "none";

    modalMother.textContent = card.dataset.mom || "";
    modalFather.textContent = card.dataset.dad || "";
    modalLineage.textContent = card.dataset.lineage || "";

    modalFlavor.textContent = card.dataset.flavor || "";
    modalEffects.textContent = card.dataset.effects || "";

    const quote = card.dataset.review || "";
    if (quote) {
      modalQuote.textContent = quote;
      modalQuoteSection.style.display = "block";
    } else {
      modalQuoteSection.style.display = "none";
    }

    fillTerpRow(1, card);
    fillTerpRow(2, card);
    fillTerpRow(3, card);

    const anyTerps = [...modalTerpsSection.querySelectorAll(".terp-row")]
      .some((row) => row.style.display !== "none");

    modalTerpsSection.style.display = anyTerps ? "block" : "none";

    modal.classList.add("open");
    body.classList.add("no-scroll");
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  // CLOSE MODAL
  function closeModal() {
    modal.classList.remove("open");
    if (!menu.classList.contains("active")) body.classList.remove("no-scroll");
  }

  modalCloseBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (!modalDialog.contains(e.target)) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // ------------------------------------------------------------
  // QR HASH → OPEN SPECIFIC STRAIN
  // ------------------------------------------------------------
  const hash = window.location.hash.replace("#", "").trim();
  if (hash) {
    const target = hash.toLowerCase();

    const match = cards.find((c) => {
      const slug = (c.dataset.slug || "").toLowerCase();
      const nameSlug = (c.dataset.name || "").toLowerCase().replace(/\s+/g, "-");
      return slug === target || nameSlug === target;
    });

    if (match) {
      match.scrollIntoView({ behavior: "smooth", block: "center" });
      setTimeout(() => openModal(match), 500);
    }
  }
});
