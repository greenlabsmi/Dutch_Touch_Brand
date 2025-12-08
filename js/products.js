// ============================================================
// DUTCH TOUCH • PRODUCTS PAGE JS
// Nav scroll • Menu • Filters • Search
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-products-page")) return;

  // ------------------------------------------------------------
  // NAV SCROLL (copied from strains)
  // ------------------------------------------------------------
  const nav = document.getElementById("dtNav");

  function updateNav() {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  updateNav();
  window.addEventListener("scroll", updateNav);

  // ------------------------------------------------------------
  // SLIDE-OUT MENU (copied from strains)
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
      body.classList.remove("no-scroll");
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
  // PRODUCT DATA
  // ------------------------------------------------------------

  const PLACEHOLDER_IMG = "assets/img/products/placeholder.png";

  // Helper to make tags array
  const t = (...items) =>
    items
      .filter(Boolean)
      .map((x) => String(x).toLowerCase().trim());

  const products = [
    // ============================
    // AWARD WINNERS
    // ============================
    {
      name: "Space Hippy 1g Disposable",
      category: "disposable",
      award: true,
      awardNote: "High Times Cup • 2024",
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("space hippy", "disposable", "distillate", "vape", "high times", "cup")
    },
    {
      name: "Angelica RSO",
      category: "rso",
      award: true,
      awardNote: "1st Place • High Times Cup",
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("angelica", "rso", "syringe", "high times")
    },
    {
      name: "Death By Funk Sugar (Concentrate)",
      category: "resin",
      award: true,
      awardNote: "3rd Place • High Times Cup Concentrates",
      subtitle: "Sugar Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("death by funk", "sugar", "concentrate", "resin", "high times")
    },
    {
      name: "Death By Funk Rosin",
      category: "rosin",
      award: true,
      awardNote: "Award-Winning Rosin",
      subtitle: "Premium Rosin",
      image: PLACEHOLDER_IMG,
      tags: t("death by funk", "rosin", "hash rosin")
    },

    // ============================
    // DISPOSABLES (1g Distillate)
    // ============================
    {
      name: "Mr. Clean 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("mr clean", "disposable", "distillate", "vape")
    },
    {
      name: "Sin City Grapes 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("sin city grapes", "grape", "disposable", "distillate")
    },
    {
      name: "13 Layer Cake 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("13 layer cake", "cake", "disposable", "distillate")
    },
    {
      name: "Mango Hashplant 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("mango hashplant", "disposable", "distillate")
    },
    {
      name: "Space Monkey 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("space monkey", "disposable", "distillate")
    },
    {
      name: "Death By Funk 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("death by funk", "disposable", "distillate")
    },
    {
      name: "Triple Chocolate Chip 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("triple chocolate chip", "chocolate", "disposable", "distillate")
    },
    {
      name: "Sunshine Daydream 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("sunshine daydream", "disposable", "distillate")
    },
    {
      name: "Pineapple OG 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("pineapple og", "disposable", "distillate")
    },
    {
      name: "Stroopwaffles 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("stroopwaffles", "stroopwafel", "disposable", "distillate")
    },
    {
      name: "Old Widow 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("old widow", "disposable", "distillate")
    },
    {
      name: "Double D 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("double d", "disposable", "distillate")
    },
    {
      name: "Birthday Cake 1g Disposable",
      category: "disposable",
      award: false,
      subtitle: "1g Distillate Disposable",
      image: PLACEHOLDER_IMG,
      tags: t("birthday cake", "disposable", "distillate")
    },

    // ============================
    // RSO SYRINGES
    // ============================
    {
      name: "Dead Prez RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("dead prez", "rso", "syringe")
    },
    {
      name: "Mr. Clean RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("mr clean", "rso", "syringe")
    },
    {
      name: "Death Star RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("death star", "rso", "syringe")
    },
    {
      name: "Orange Kush Cake RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("orange kush cake", "rso", "syringe")
    },
    {
      name: "Milk & Cookies RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("milk & cookies", "rso", "syringe")
    },
    {
      name: "Mixed Blend RSO",
      category: "rso",
      award: false,
      subtitle: "RSO Blend Syringe",
      image: PLACEHOLDER_IMG,
      tags: t("mixed blend", "rso", "blend")
    },

    // ============================
    // RSO GUMMIES / BARS (GUMMIES CATEGORY)
    // ============================
    {
      name: "RSO Gummies (Assorted)",
      category: "gummies",
      award: false,
      subtitle: "RSO Gummies",
      image: PLACEHOLDER_IMG,
      tags: t("rso", "gummies")
    },
    {
      name: "Watermelon 200mg RSO Bar",
      category: "gummies",
      award: false,
      subtitle: "200mg RSO Bar • Compact size for heavy users",
      image: PLACEHOLDER_IMG,
      tags: t("rso", "watermelon", "bar", "gummies")
    },
    {
      name: "Nerd-Covered Grape RSO Gummies",
      category: "gummies",
      award: false,
      subtitle: "RSO Nerd-Covered Grape Gummies",
      image: PLACEHOLDER_IMG,
      tags: t("rso", "nerds", "grape", "gummies")
    },

    // ============================
    // DISTILLATE GUMMIES
    // ============================
    {
      name: "Maraschino Cherry Distillate Gummies",
      category: "gummies",
      award: false,
      subtitle: "Distillate Gummies • Maraschino Cherry",
      image: PLACEHOLDER_IMG,
      tags: t("distillate", "gummies", "maraschino cherry")
    },
    {
      name: "Berry Burst Distillate Gummies",
      category: "gummies",
      award: false,
      subtitle: "Distillate Gummies • Berry Burst",
      image: PLACEHOLDER_IMG,
      tags: t("distillate", "gummies", "berry burst")
    },
    {
      name: "Bomb Pop Distillate Gummies",
      category: "gummies",
      award: false,
      subtitle: "Distillate Gummies • Bomb Pop",
      image: PLACEHOLDER_IMG,
      tags: t("distillate", "gummies", "bomb pop")
    },

    // ============================
    // DISTILLATE (DARTS)
    // ============================
    {
      name: "DTG Distillate Darts",
      category: "darts",
      award: false,
      subtitle: "Distillate Darts",
      image: PLACEHOLDER_IMG,
      // include "rso" here so searching RSO shows darts, as requested
      tags: t("distillate", "darts", "rso", "syringe")
    },

    // ============================
    // RESIN (SUGAR / BATTER / DIAMONDS)
    // ============================
    {
      name: "Purple Lambo Sugar",
      category: "resin",
      award: false,
      subtitle: "Sugar Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("purple lambo", "sugar", "resin", "concentrate")
    },
    {
      name: "Sin City Grapes Batter",
      category: "resin",
      award: false,
      subtitle: "Batter Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("sin city grapes", "batter", "resin", "concentrate")
    },
    {
      name: "Mr. Clean Batter",
      category: "resin",
      award: false,
      subtitle: "Batter Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("mr clean", "batter", "resin", "concentrate")
    },
    {
      name: "Mr. Clean Diamonds",
      category: "resin",
      award: false,
      subtitle: "Diamonds Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("mr clean", "diamonds", "resin", "concentrate")
    },
    {
      name: "Frute Brute Batter",
      category: "resin",
      award: false,
      subtitle: "Batter Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("frute brute", "batter", "resin", "concentrate")
    },
    // Death By Funk Sugar already added above as award winner
    {
      name: "Space Hippy Bug Run Sugar",
      category: "resin",
      award: false,
      subtitle: "Bug Run Sugar",
      image: PLACEHOLDER_IMG,
      tags: t("space hippy", "bug run", "sugar", "resin", "concentrate")
    },
    {
      name: "White Wampa Sugar",
      category: "resin",
      award: false,
      subtitle: "Sugar Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("white wampa", "sugar", "resin", "concentrate")
    },
    {
      name: "Kitchen Sink Sugar",
      category: "resin",
      award: false,
      subtitle: "Sugar Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("kitchen sink", "sugar", "resin", "concentrate")
    },
    {
      name: "Mango Hashplant Batter",
      category: "resin",
      award: false,
      subtitle: "Batter Concentrate",
      image: PLACEHOLDER_IMG,
      tags: t("mango hashplant", "batter", "resin", "concentrate")
    },

    // ============================
    // ROSIN (NON-AWARD)
    // ============================
    {
      name: "Blue Zushie Rosin",
      category: "rosin",
      award: false,
      subtitle: "Rosin",
      image: PLACEHOLDER_IMG,
      tags: t("blue zushie", "rosin")
    },
    {
      name: "Death Coast Rosin",
      category: "rosin",
      award: false,
      subtitle: "Rosin",
      image: PLACEHOLDER_IMG,
      tags: t("death coast", "rosin")
    },
    {
      name: "Super Boof Rosin",
      category: "rosin",
      award: false,
      subtitle: "Rosin",
      image: PLACEHOLDER_IMG,
      tags: t("super boof", "rosin")
    },
    {
      name: "Banana Badger Rosin",
      category: "rosin",
      award: false,
      subtitle: "Rosin",
      image: PLACEHOLDER_IMG,
      tags: t("banana badger", "rosin")
    }
  ];

  // ------------------------------------------------------------
  // SORTING (Award winners, then A–Z)
  // ------------------------------------------------------------
  function sortProducts(list) {
    return list.sort((a, b) => {
      if (a.award && !b.award) return -1;
      if (!a.award && b.award) return 1;
      const A = a.name.toLowerCase();
      const B = b.name.toLowerCase();
      return A.localeCompare(B);
    });
  }

  // ------------------------------------------------------------
  // RENDERING
  // ------------------------------------------------------------
  const grid = document.getElementById("productGrid");
  const filterButtons = document.querySelectorAll(".product-filter");
  const searchInput = document.getElementById("productSearch");

  let activeFilter = "all";
  let currentQuery = "";

  function renderProducts(list) {
    if (!grid) return;
    grid.innerHTML = "";

    list.forEach((product) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.dataset.name = product.name || "";
      card.dataset.category = product.category || "";
      card.dataset.award = product.award ? "true" : "false";
      card.dataset.tags = (product.tags || []).join(" ");

      const awardBadge =
        product.award ? `<span class="product-badge">Award Winner</span>` : "";

      const awardNoteText = product.award && product.awardNote
        ? ` • ${product.awardNote}`
        : "";

      card.innerHTML = `
        <div class="product-card-inner">
          <div class="product-image"></div>
          <div class="product-content">
            <div class="product-top">
              <h3 class="product-name">${product.name}</h3>
              ${awardBadge}
            </div>
            <p class="product-meta">
              ${product.subtitle || ""}${awardNoteText}
            </p>
          </div>
        </div>
      `;

      const img = card.querySelector(".product-image");
      if (img) {
        img.style.backgroundImage = `url(${product.image || PLACEHOLDER_IMG})`;
      }

      grid.appendChild(card);
    });
  }

  // ------------------------------------------------------------
  // FILTER LOGIC
  // ------------------------------------------------------------
  function baseFilteredProducts() {
    // start with all products
    let list = [...products];

    if (activeFilter === "award") {
      list = list.filter((p) => p.award);
    } else if (
      ["disposable", "rso", "gummies", "distillate", "resin", "rosin", "darts"]
        .includes(activeFilter)
    ) {
      // category filter
      list = list.filter((p) => p.category === activeFilter);
    }

    return list;
  }

  function matchesSearch(product, query) {
    if (!query) return true;
    const q = query.toLowerCase();

    const name = (product.name || "").toLowerCase();
    const category = (product.category || "").toLowerCase();
    const subtitle = (product.subtitle || "").toLowerCase();
    const tags = (product.tags || []).join(" ").toLowerCase();

    return (
      name.includes(q) ||
      category.includes(q) ||
      subtitle.includes(q) ||
      tags.includes(q)
    );
  }

  function applyView() {
    let list = baseFilteredProducts();

    if (currentQuery.trim()) {
      list = list.filter((p) => matchesSearch(p, currentQuery));
    }

    renderProducts(sortProducts(list));
  }

  // ------------------------------------------------------------
  // FILTER BUTTON EVENTS
  // ------------------------------------------------------------
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter || "all";
      activeFilter = filter;
      currentQuery = ""; // clear search when user taps a filter

      if (searchInput) {
        searchInput.value = "";
      }

      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      applyView();
    });
  });

  // ------------------------------------------------------------
  // SEARCH BAR
  // ------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentQuery = searchInput.value || "";

      // While searching, visually reset filters
      if (currentQuery.trim()) {
        filterButtons.forEach((btn) => btn.classList.remove("is-active"));
        activeFilter = "all";
      } else {
        // if search cleared, reset to ALL
        activeFilter = "all";
        const allBtn = document.querySelector(
          '.product-filter[data-filter="all"]'
        );
        if (allBtn) allBtn.classList.add("is-active");
      }

      applyView();
    });
  }

  // ------------------------------------------------------------
  // INITIAL RENDER
  // ------------------------------------------------------------
  // default = All, award winners first then A–Z
  activeFilter = "all";
  currentQuery = "";
  const allBtn = document.querySelector('.product-filter[data-filter="all"]');
  if (allBtn) allBtn.classList.add("is-active");

  applyView();
});
