// ============================================================
// DUTCH TOUCH • STORES PAGE JS
// Nav scroll • Menu
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  if (!body.classList.contains("dt-stores-page")) return;

  // ------------------------------------------------------------
  // NAV SCROLL
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
  // SLIDE-OUT MENU
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
});
