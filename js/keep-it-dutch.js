const PLACEHOLDER_LOGO = "assets/img/logo/dtg-logo-orange.png";

const FALLBACK_TERPS = {
  "mr-clean": ["Limonene", "Pinene", "Terpinolene"],
  "lilac-diesel": ["Terpinolene", "Limonene", "Ocimene"],
  "lemon-wookie": ["Limonene", "Terpinolene", "Caryophyllene"],
  "clusterfunk": ["Myrcene", "Caryophyllene", "Humulene"],
  "death-by-funk": ["Myrcene", "Caryophyllene", "Humulene"],
  "forbidden-jelly": ["Myrcene", "Limonene", "Linalool"],
  "space-hippy": ["Myrcene", "Limonene", "Caryophyllene"],
  "hash-d": ["Myrcene", "Caryophyllene", "Humulene"],
  "death-star": ["Myrcene", "Caryophyllene", "Limonene"],
  "orange-kush-cake": ["Limonene", "Caryophyllene", "Myrcene"],
  "solo-walker": ["Myrcene", "Limonene", "Caryophyllene"],
  "spirit-hashplant": ["Myrcene", "Caryophyllene", "Pinene"],
  "super-silver-hashplant": ["Terpinolene", "Caryophyllene", "Myrcene"],
  "sin-city-grapes": ["Myrcene", "Linalool", "Caryophyllene"],
  "pb-n-chocolate": ["Myrcene", "Caryophyllene", "Limonene"]
};

const HALL_OF_FAME_SLUGS = [
  "mr-clean",
  "lilac-diesel",
  "lemon-wookie",
  "death-by-funk",
  "forbidden-jelly",
  "angelica",
  "space-hippy"
];

let allStrains = [];
let leaderboardData = null;
let eventsData = null;
let dropsData = null;
let merchData = null;
let rosterData = null;
let deliGalleryData = null;

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initRevealAnimations();
  initCarousels();
  initStrainTabs();
  initForm();
  bootKeepItDutch();
});

async function bootKeepItDutch() {
  const [
    strains,
    leaderboard,
    events,
    drops,
    merch,
    roster,
    deliGallery
  ] = await Promise.all([
    fetchJson("strains.json", []),
    fetchJson("data/leaderboard.json", null),
    fetchJson("data/events.json", null),
    fetchJson("data/drops.json", null),
    fetchJson("data/merch.json", null),
    fetchJson("data/roster.json", null),
    fetchJson("data/deli-gallery.json", null)
  ]);

  allStrains = strains;
  leaderboardData = leaderboard;
  eventsData = events;
  dropsData = drops;
  merchData = merch;
  rosterData = roster;
  deliGalleryData = deliGallery;

  const leaderboardItems = leaderboardData?.leaderboard || [];

  renderDeliGallery();
  initDeliGalleryFilters();

  renderLeaderboard(leaderboardItems);
  renderChampion(leaderboardItems[0]);
  renderTitleFight(leaderboardItems);
  renderHallOfFame();
  renderStrainGrid(allStrains);
  renderVoteOptions(allStrains, leaderboardItems);
  renderDeckPreview();
  renderEvents();
  renderMerch();
  renderRoster();
  renderDropDetails();
}

/* -----------------------------
   Data helpers
----------------------------- */

async function fetchJson(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

function normalizeSlug(slug = "") {
  return slug.toLowerCase().trim();
}

function slugify(value = "") {
  return value
    .toLowerCase()
    .replace(/#/g, "")
    .replace(/&/g, "and")
    .replace(/'/g, "")
    .replace(/\./g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function findStrain(slugOrName) {
  if (!slugOrName) return null;

  const key = normalizeSlug(slugOrName);

  return allStrains.find(strain =>
    normalizeSlug(strain.slug) === key ||
    normalizeSlug(strain.name) === key
  );
}

function imageForStrain(strain, preferred = "bud") {
  if (!strain) return PLACEHOLDER_LOGO;

  if (strain.images && strain.images[preferred]) return strain.images[preferred];
  if (strain.image) return strain.image;

  const slug = strain.slug || slugify(strain.name);

  if (preferred === "card") return `assets/img/strains/${slug}-card.jpg`;
  if (preferred === "art") return `assets/img/strains/${slug}-art.jpg`;

  return `assets/img/strains/${slug}-bud.jpg`;
}

function formatGrams(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString(undefined, { maximumFractionDigits: 0 })}g`;
}

function cleanDescription(text = "", limit = 140) {
  const clean = text.replace(/🏆/g, "").replace(/\s+/g, " ").trim();
  if (clean.length <= limit) return clean;
  return `${clean.slice(0, limit).trim()}...`;
}

function inferTerps(strain) {
  const text = `${strain.description || ""} ${strain.lineage || ""}`.toLowerCase();

  if (text.includes("lemon") || text.includes("citrus") || text.includes("orange")) {
    return ["Limonene", "Terpinolene", "Caryophyllene"];
  }

  if (text.includes("fuel") || text.includes("diesel") || text.includes("funk")) {
    return ["Myrcene", "Caryophyllene", "Humulene"];
  }

  if (text.includes("grape") || text.includes("berry") || text.includes("lavender")) {
    return ["Myrcene", "Linalool", "Caryophyllene"];
  }

  return ["Myrcene", "Limonene", "Caryophyllene"];
}

/* -----------------------------
   Deli Gallery
----------------------------- */

function renderDeliGallery(filter = "all") {
  const track = document.getElementById("deliGalleryTrack");
  if (!track || !Array.isArray(deliGalleryData?.items)) return;

  const items = deliGalleryData.items.filter(item => {
    if (filter === "all") return true;

    if (filter === "deals") {
      const badge = String(item.badge || "").toLowerCase();
      return item.badgeClass === "deal" || badge.includes("special") || badge.includes("$");
    }

    return item.category === filter;
  });

  track.innerHTML = items.map(item => `
    <article class="gallery-card-wrap" data-category="${item.category}">
      <div class="gallery-flip-card" role="button" tabindex="0" aria-label="Flip ${item.name} card">
        <div class="gallery-flip-inner">
          <div class="gallery-face front">
            <span class="gallery-badge ${item.badgeClass || ""}">${item.badge || item.typeLabel}</span>
            <span class="gallery-hint">Tap Art</span>
            <img src="${item.bud}" alt="${item.name} flower" onerror="this.src='${PLACEHOLDER_LOGO}'">
          </div>

          <div class="gallery-face back">
            <span class="gallery-badge ${item.badgeClass || ""}">${item.badge || item.typeLabel}</span>
            <span class="gallery-hint">Tap Bud</span>
            <img src="${item.art}" alt="${item.name} art" onerror="this.src='${item.bud || PLACEHOLDER_LOGO}'">
          </div>
        </div>
      </div>

      <div class="gallery-info">
        <div class="gallery-info-row">
          <div>
            <h3>${item.name}</h3>
            <p class="gallery-meta">${item.typeLabel}${item.thc ? ` • ${item.thc}` : ""}</p>
          </div>
          <span class="gallery-price">${item.price || ""}</span>
        </div>

        <p>${item.tagline || ""}</p>

        <div class="gallery-actions">
          <a href="${item.profileUrl || "#strains"}" class="mini-link">Explore</a>
          <a href="#join" class="mini-link">Vote</a>
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".gallery-flip-card").forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("is-flipped");
      if (typeof triggerHaptic === "function") triggerHaptic();
    });

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.classList.toggle("is-flipped");
      }
    });
  });
}

function initDeliGalleryFilters() {
  document.querySelectorAll("#galleryFilters button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#galleryFilters button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderDeliGallery(button.dataset.filter);
    });
  });
}

/* -----------------------------
   Leaderboard
----------------------------- */

function renderChampion(item) {
  const champCard = document.getElementById("champCard");
  if (!champCard || !item) return;

  const strain = findStrain(item.slug) || item;
  const image = imageForStrain(strain, "bud");

  champCard.innerHTML = `
    <span class="badge">${item.badge || "Current Champion"}</span>
    <img class="champ-image" src="${image}" alt="${item.name}" onerror="this.src='${PLACEHOLDER_LOGO}'">
    <h3>${item.name}</h3>
    <p>${item.story || `${formatGrams(item.gramsSold)} sold this week.`}</p>
    <p><strong>${formatGrams(item.gramsSold)}</strong> sold this week</p>
    <a class="btn btn-ghost" href="#join">Vote for ${item.name}</a>
  `;
}

function renderLeaderboard(items) {
  const rankList = document.getElementById("rankList");
  if (!rankList) return;

  rankList.innerHTML = items.map(item => {
    const medal =
      item.rank === 1 ? "🥇" :
      item.rank === 2 ? "🥈" :
      item.rank === 3 ? "🥉" :
      item.rank;

    return `
      <div class="rank-item ${item.rank === 1 ? "top" : ""}" data-slug="${item.slug}">
        <span class="rank-num">${medal}</span>
        <span class="rank-name">${item.name}</span>
        <span class="rank-sold">${formatGrams(item.gramsSold)}</span>
      </div>
    `;
  }).join("");

  const total = leaderboardData?.totalGramsTracked ||
    items.reduce((sum, item) => sum + Number(item.gramsSold || 0), 0);

  const totalGrams = document.getElementById("totalGrams");
  const strainCount = document.getElementById("strainCount");

  if (totalGrams) totalGrams.textContent = `${(total / 1000).toFixed(1)}k+`;
  if (strainCount) strainCount.textContent = String(leaderboardData?.totalStrainsTracked || items.length);

  document.querySelectorAll(".rank-item").forEach(item => {
    item.addEventListener("click", () => {
      const select = document.getElementById("favoriteStrain");
      const strain = findStrain(item.dataset.slug);
      if (select && strain) select.value = strain.name;
      document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderTitleFight(items) {
  const fightTitle = document.getElementById("fightTitle");
  const fightCopy = document.getElementById("fightCopy");

  if (!fightTitle || !fightCopy || items.length < 2) return;

  const champ = items[0];
  const challenger = items[1];
  const gap = Number(champ.gramsSold || 0) - Number(challenger.gramsSold || 0);

  fightTitle.textContent = `${champ.name} vs. ${challenger.name}`;

  fightCopy.textContent =
    `${champ.name} holds the crown with ${formatGrams(champ.gramsSold)}, while ${challenger.name} is chasing hard. Only ${formatGrams(gap)} separates the champion from the #1 challenger.`;
}

/* -----------------------------
   Hall of Fame
----------------------------- */

function renderHallOfFame() {
  const track = document.getElementById("hallTrack");
  if (!track) return;

  const hallItems = HALL_OF_FAME_SLUGS.map(slug => findStrain(slug)).filter(Boolean);

  track.innerHTML = hallItems.map(strain => `
    <article class="hof-card">
      <img src="${imageForStrain(strain, "bud")}" alt="${strain.name}" onerror="this.src='${PLACEHOLDER_LOGO}'">
      <span class="badge">${strain.award ? "Award Winner" : "DTG Legend"}</span>
      <h3>${strain.name}</h3>
      <p>${cleanDescription(strain.description, 130)}</p>
      <small>${strain.lineage || "Dutch Touch Genetics"}</small>
    </article>
  `).join("");
}

/* -----------------------------
   Strain Intelligence
----------------------------- */

function renderStrainGrid(strains, filter = "all") {
  const grid = document.getElementById("strainGrid");
  if (!grid) return;

  const featured = strains
    .filter(strain => strain.image || strain.award || strain.favorite)
    .filter(strain => {
      const type = normalizeSlug(strain.type);
      if (filter === "all") return true;
      if (filter === "award") return Boolean(strain.award);
      if (filter === "favorite") return Boolean(strain.favorite);
      return type === filter;
    })
    .slice(0, 12);

  grid.innerHTML = featured.map(strain => {
    const terps = strain.terpenes || FALLBACK_TERPS[strain.slug] || inferTerps(strain);

    return `
      <article class="strain-card">
        <img src="${imageForStrain(strain, "bud")}" alt="${strain.name}" onerror="this.src='${PLACEHOLDER_LOGO}'">

        <div class="strain-card-body">
          ${strain.award ? `<span class="badge">Award Winner</span>` : ""}
          ${strain.favorite ? `<span class="badge">Fan Favorite</span>` : ""}

          <h3>${strain.name}</h3>

          <div class="strain-meta">
            <span>${strain.type || "Hybrid"}</span>
            <span>${strain.breeder || "Dutch Touch Genetics"}</span>
          </div>

          <p>${cleanDescription(strain.description, 125)}</p>

          <div class="terp-list">
            ${terps.map(terp => `<span>${terp}</span>`).join("")}
          </div>

          <div class="card-actions">
            <a href="strains.html#${strain.slug}" class="mini-link">View Profile</a>
            <a href="#" class="mini-link">Test Results</a>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function initStrainTabs() {
  document.querySelectorAll("#strainTabs button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#strainTabs button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderStrainGrid(allStrains, button.dataset.filter);
    });
  });
}

/* -----------------------------
   Dutch Deck
----------------------------- */

function renderDeckPreview() {
  const feature = document.getElementById("deckFeature");
  const setGrid = document.getElementById("deckSetGrid");

  const cards = typeof GL_CARDS !== "undefined" ? GL_CARDS : [];
  const sets = typeof GL_SETS !== "undefined" ? GL_SETS : [];

  const featuredCard = cards.find(card => card.id === "mr-clean") || cards[0];

  if (feature && featuredCard) {
    feature.innerHTML = `
      <img src="${featuredCard.image}" alt="${featuredCard.name}" onerror="this.src='${PLACEHOLDER_LOGO}'">
      <span class="badge">${featuredCard.rarity || "Dutch Deck"}</span>
      <h3>${featuredCard.name}</h3>
      <p>${featuredCard.reward || "Collect the card. Unlock the story."}</p>
      <a class="btn btn-ghost" href="deck.html">View Deck</a>
    `;
  }

  if (setGrid && sets.length) {
    setGrid.innerHTML = sets.slice(0, 6).map(set => `
      <article class="deck-set-card">
        <strong>${set.cardIds?.length || 0} Cards</strong>
        <h3>${set.name}</h3>
        <p>${set.tagline}</p>
        <small>${set.reward}</small>
      </article>
    `).join("");
  }
}

/* -----------------------------
   Events
----------------------------- */

function renderEvents() {
  const eventHero = document.querySelector(".event-hero > div");
  const eventGrid = document.getElementById("eventGrid");

  const event = eventsData?.featuredEvent;

  if (eventHero && event) {
    eventHero.innerHTML = `
      <p class="eyebrow">Mock Future Event</p>
      <h2>${event.title}</h2>
      <p>${event.tagline}</p>

      <div class="event-meta">
        <span>${event.location}</span>
        <span>${event.timeLabel}</span>
        <span>${event.city}</span>
        <span>${event.dateLabel}</span>
      </div>

      <a href="${event.cta?.target || "#join"}" class="btn btn-gold">
        ${event.cta?.label || "Join Event List"}
      </a>
    `;
  }

  if (eventGrid && Array.isArray(eventsData?.eventConcepts)) {
    eventGrid.innerHTML = eventsData.eventConcepts.slice(0, 6).map((item, index) => `
      <article>
        <strong>${String(index + 1).padStart(2, "0")}</strong>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
      </article>
    `).join("");
  }
}

/* -----------------------------
   Monthly Drops
----------------------------- */

function renderDropDetails() {
  const rosinContent = document.querySelector(".rosin-content");
  const drop = dropsData?.currentDrop;

  if (!rosinContent || !drop) return;

  const rosin = drop.rosinPreview;

  rosinContent.innerHTML = `
    <p class="eyebrow">${drop.launchLabel || "Monthly Drop"}</p>
    <h2>${rosin?.title || "The Rosin Spot"}</h2>
    <p>${rosin?.description || drop.description}</p>

    <div class="rosin-pills">
      ${(rosin?.products || []).map(product => `<span>${product}</span>`).join("")}
    </div>

    <a href="${drop.cta?.target || "#join"}" class="btn btn-gold">
      ${drop.cta?.label || "Join Drop Alerts"}
    </a>
  `;
}

/* -----------------------------
   Merch
----------------------------- */

function renderMerch() {
  const merchGrid = document.getElementById("merchGrid");
  if (!merchGrid || !Array.isArray(merchData?.products)) return;

  merchGrid.innerHTML = merchData.products.slice(0, 6).map(product => `
    <article>
      <div class="mock-product">
        ${product.image ? `<img src="${product.image}" alt="${product.name}" onerror="this.parentElement.textContent='DTG'">` : product.name.slice(0, 3)}
      </div>
      <span class="badge">${product.collection || "Merch Drop"}</span>
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p><strong>${product.priceLabel || ""}</strong> ${product.status || ""}</p>
      <a href="${product.shopifyUrl || "#join"}" class="btn btn-ghost">
        ${product.shopifyUrl ? "Shop Now" : product.cta || "Coming Soon"}
      </a>
    </article>
  `).join("");
}

/* -----------------------------
   Roster / Staff Picks
----------------------------- */

function renderRoster() {
  const teamTags = document.getElementById("teamTags");
  if (!teamTags || !Array.isArray(rosterData?.staffPicks)) return;

  teamTags.innerHTML = rosterData.staffPicks.map(person => `
    <span>${person.name}: ${person.pick}</span>
  `).join("");
}

/* -----------------------------
   Vote Options
----------------------------- */

function renderVoteOptions(strains, leaderboardItems) {
  const select = document.getElementById("favoriteStrain");
  if (!select) return;

  const prioritySlugs = leaderboardItems.map(item => item.slug);
  const priority = prioritySlugs.map(slug => findStrain(slug)).filter(Boolean);

  const remaining = strains
    .filter(strain => !prioritySlugs.includes(strain.slug))
    .sort((a, b) => a.name.localeCompare(b.name));

  const options = [...priority, ...remaining];

  select.innerHTML = `
    <option value="">Favorite strain</option>
    ${options.map(strain => `<option value="${strain.name}">${strain.name}</option>`).join("")}
  `;
}

/* -----------------------------
   Form
----------------------------- */

function initForm() {
  const form = document.getElementById("kidForm");
  const message = document.getElementById("formMessage");

  if (!form || !message) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(form);

    const vote = {
      firstName: formData.get("firstName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      favoriteStrain: formData.get("favoriteStrain"),
      interests: formData.getAll("interests"),
      source: "Keep It Dutch Club Demo",
      submittedAt: new Date().toISOString()
    };

    const saved = JSON.parse(localStorage.getItem("keepItDutchVotes") || "[]");
    saved.push(vote);
    localStorage.setItem("keepItDutchVotes", JSON.stringify(saved));

    message.textContent = `${vote.favoriteStrain} got your vote. You're in the club.`;
    form.reset();

    console.log("Keep It Dutch demo signup:", vote);
  });
}

/* -----------------------------
   UI Helpers
----------------------------- */

function initRevealAnimations() {
  const els = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  els.forEach(el => observer.observe(el));
}

function initCarousels() {
  document.querySelectorAll(".carousel-btn").forEach(button => {
    button.addEventListener("click", () => {
      const target = document.getElementById(button.dataset.target);
      if (!target) return;

      const direction = button.classList.contains("next") ? 1 : -1;

      target.scrollBy({
        left: direction * 330,
        behavior: "smooth"
      });
    });
  });
}

function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("kidNav");

  if (!btn || !nav) return;

  btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}
