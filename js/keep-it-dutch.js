const DEMO_LEADERBOARD = [
  { rank: 1, slug: "mr-clean", name: "Mr. Clean", gramsSold: 1926.45, badge: "Current Champion" },
  { rank: 2, slug: "lilac-diesel", name: "Lilac Diesel", gramsSold: 1150.19, badge: "Challenger" },
  { rank: 3, slug: "lemon-wookie", name: "Lemon Wookie #4", gramsSold: 913.76, badge: "Hall of Famer" },
  { rank: 4, slug: "clusterfunk", name: "Clusterfunk", gramsSold: 664.32, badge: "Staff Favorite" },
  { rank: 5, slug: "solo-walker", name: "Solo Walker", gramsSold: 624.78, badge: "Top Mover" },
  { rank: 6, slug: "ripped-bubba-4", name: "Ripped Bubba #4", gramsSold: 332.44, badge: "" },
  { rank: 7, slug: "pb-n-chocolate", name: "Peanut Butter N' Chocolate", gramsSold: 315.19, badge: "" },
  { rank: 8, slug: "hash-d", name: "Hash D", gramsSold: 278.87, badge: "" },
  { rank: 9, slug: "spirit-hashplant", name: "Spirit Hashplant", gramsSold: 253.05, badge: "" },
  { rank: 10, slug: "green-crack", name: "Green Crack", gramsSold: 223.72, badge: "" }
];

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

const PLACEHOLDER_LOGO = "assets/img/logo/dtg-logo-orange.png";

let allStrains = [];
let leaderboard = [];

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initRevealAnimations();
  initCarousels();
  initForm();
  bootKeepItDutch();
});

async function bootKeepItDutch() {
  allStrains = await fetchJson("strains.json", []);
  leaderboard = await fetchLeaderboard();

  renderLeaderboard(leaderboard);
  renderChampion(leaderboard[0]);
  renderTitleFight(leaderboard);
  renderHallOfFame(allStrains);
  renderStrainGrid(allStrains);
  renderVoteOptions(allStrains);
  renderDeckPreview();
}

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

async function fetchLeaderboard() {
  const data = await fetchJson("data/leaderboard.json", null);

  if (data && Array.isArray(data.leaderboard)) {
    return data.leaderboard;
  }

  return DEMO_LEADERBOARD;
}

function normalizeSlug(slug = "") {
  return slug.toLowerCase().trim();
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

function formatGrams(value) {
  const number = Number(value || 0);
  return `${number.toLocaleString(undefined, { maximumFractionDigits: 0 })}g`;
}

/* Leaderboard */
function renderChampion(item) {
  const champCard = document.getElementById("champCard");
  if (!champCard || !item) return;

  const strain = findStrain(item.slug) || item;
  const image = imageForStrain(strain, "bud");

  champCard.innerHTML = `
    <span class="badge">${item.badge || "Current Champion"}</span>
    <img class="champ-image" src="${image}" alt="${item.name}" onerror="this.src='${PLACEHOLDER_LOGO}'">
    <h3>${item.name}</h3>
    <p>${formatGrams(item.gramsSold)} sold this week. The current Dutch Deli champion and the strain everyone is chasing.</p>
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

  const total = items.reduce((sum, item) => sum + Number(item.gramsSold || 0), 0);
  const totalGrams = document.getElementById("totalGrams");
  const strainCount = document.getElementById("strainCount");

  if (totalGrams) totalGrams.textContent = `${(total / 1000).toFixed(1)}k+`;
  if (strainCount) strainCount.textContent = String(items.length);

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
    `${champ.name} holds the crown with ${formatGrams(champ.gramsSold)}, but ${challenger.name} is chasing hard. ` +
    `Only ${formatGrams(gap)} separates the champ from the #1 challenger.`;
}

/* Hall */
function renderHallOfFame(strains) {
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

/* Strains */
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
          <h3>${strain.name}</h3>

          <div class="strain-meta">
            <span>${strain.type || "Hybrid"}</span>
            <span>${strain.breeder || "Dutch Touch Genetics"}</span>
          </div>

          <p>${cleanDescription(strain.description, 120)}</p>

          <div class="terp-list">
            ${terps.map(terp => `<span>${terp}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");
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

function initStrainTabs() {
  document.querySelectorAll("#strainTabs button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("#strainTabs button").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderStrainGrid(allStrains, button.dataset.filter);
    });
  });
}

/* Deck */
function renderDeckPreview() {
  const feature = document.getElementById("deckFeature");
  const setGrid = document.getElementById("deckSetGrid");

  const cards = Array.isArray(window.GL_CARDS) ? window.GL_CARDS : (typeof GL_CARDS !== "undefined" ? GL_CARDS : []);
  const sets = Array.isArray(window.GL_SETS) ? window.GL_SETS : (typeof GL_SETS !== "undefined" ? GL_SETS : []);

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

/* Vote options */
function renderVoteOptions(strains) {
  const select = document.getElementById("favoriteStrain");
  if (!select) return;

  const prioritySlugs = leaderboard.map(item => item.slug);
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

/* Form */
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

/* Utility */
function cleanDescription(text = "", limit = 140) {
  const clean = text.replace(/🏆/g, "").replace(/\s+/g, " ").trim();

  if (clean.length <= limit) return clean;

  return `${clean.slice(0, limit).trim()}...`;
}

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

/* Start tabs after DOM exists */
document.addEventListener("DOMContentLoaded", initStrainTabs);
