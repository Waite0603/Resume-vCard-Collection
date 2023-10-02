const navToggle = document.getElementById("nav-toggle"),
  navMenu = document.getElementById("nav-menu"),
  navLink = document.querySelectorAll(".nav__link"),
  sidebarToggle = document.getElementById("sidebar-toggle"),
  sidebar = document.getElementById("sidebar");

/* Open and close navigation menu */
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");

  // Close the sidebar when we open the navigation menu
  if (sidebar.classList.contains("sidebar--open")) {
    sidebar.classList.remove("sidebar--open");
  }

  // change nav toggle icon
  changeToggleIcon(
    navMenu,
    "nav__menu--open",
    navToggle,
    "ri-menu-3-line",
    "ri-close-line"
  );

  // change sidebar toggle icon
  changeToggleIcon(
    sidebar,
    "sidebar--open",
    sidebarToggle,
    "ri-more-2-fill",
    "ri-close-line"
  );
});

// Close the mobile navigation menu when we click on each nav link
navLink.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("nav__menu--open")) {
      navMenu.classList.remove("nav__menu--open");
    }

    // change nav toggle icon
    changeToggleIcon(
      navMenu,
      "nav__menu--open",
      navToggle,
      "ri-menu-3-line",
      "ri-close-line"
    );
  });
});

/* Open and close sidebar */
sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("sidebar--open");

  // Close the mobile menu when we open the sidebar
  if (navMenu.classList.contains("nav__menu--open")) {
    navMenu.classList.remove("nav__menu--open");
  }

  // change nav toggle icon
  changeToggleIcon(
    navMenu,
    "nav__menu--open",
    navToggle,
    "ri-menu-3-line",
    "ri-close-line"
  );

  // change sidebar toggle icon
  changeToggleIcon(
    sidebar,
    "sidebar--open",
    sidebarToggle,
    "ri-more-2-fill",
    "ri-close-line"
  );
});

// Change toggle icons

function changeToggleIcon(
  element,
  elementClass,
  toggleIcon,
  openIcon,
  closeIcon
) {
  element.classList.contains(elementClass)
    ? toggleIcon.classList.replace(openIcon, closeIcon)
    : toggleIcon.classList.replace(closeIcon, openIcon);
}

// Filter Menu items

let mixMenu = mixitup(".menu__wrapper", {
  load: {
    filter: ".breakfast",
  },
  selectors: {
    target: ".menu__card",
  },
  animation: {
    duration: 800,
  },
});

const menuItems = document.querySelectorAll(".menu__item");

function activeMenuItem() {
  menuItems.forEach((item) => item.classList.remove("menu__item--active"));
  this.classList.add("menu__item--active");
}

menuItems.forEach((item) => item.addEventListener("click", activeMenuItem));

// ScrollReveal Animations

const sr = ScrollReveal({
  distance: "100px",
  duration: 2000,
  delay: 400,
});

sr.reveal(".home__content");
sr.reveal(".home__img", { origin: "top" });
sr.reveal(".feature__card", { interval: 200 });
sr.reveal(".about__img", { origin: "left" });
sr.reveal(".about__content", { origin: "right" });
sr.reveal(".testimonial__card, .blog__post, .footer__content", {
  interval: 200,
});
