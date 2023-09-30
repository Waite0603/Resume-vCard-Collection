const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navLinks = document.querySelectorAll(".nav__link");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("nav__menu--open");
  changeToggleIcon();
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--open");
    changeToggleIcon();
  });
});

// change the nav toggle icon
function changeToggleIcon() {
  if (navMenu.classList.contains("nav__menu--open")) {
    navToggle.classList.replace("ri-menu-4-line", "ri-close-line");
  } else {
    navToggle.classList.replace("ri-close-line", "ri-menu-4-line");
  }
}

// Activate nav link on scroll
function addActiveLink() {
  const section = document.querySelectorAll("section[id]");
  section.forEach((section) => {
    const scrollY = window.scrollY,
      sectionTop = section.offsetTop - 100,
      sectionHeight = section.offsetHeight,
      sectionId = section.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.add("nav__link--active");
    } else {
      document
        .querySelector(".nav__link[href*=" + sectionId + "]")
        .classList.remove("nav__link--active");
    }
  });
}

window.addEventListener("scroll", addActiveLink);

// increment counter
function startCounter(counter) {
  // Get the target number
  const targetNumber = counter.getAttribute("data-target");
  const increment = setInterval(() => {
    counter.textContent++;

    if (counter.textContent == targetNumber) {
      clearInterval(increment);
    }
  }, 2000 / targetNumber);
}

const counterSection = document.querySelector(".counter");
const counters = document.querySelectorAll(".counter__number");
let started = false;

window.addEventListener("scroll", () => {
  if (window.scrollY >= counterSection.offsetTop - 400) {
    if (!started) {
      counters.forEach((counter) => startCounter(counter));
    }
    started = true;
  }
});

// Testimonial Swiper

const TestimonialSwiper = new Swiper(".testimonial__wrapper", {
  spaceBetween: 40,
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// Scrolltop
const scrolltop = document.getElementById("scrolltop");

window.addEventListener("scroll", () => {
  if (this.scrollY >= 300) {
    scrolltop.classList.add("scrolltop--show");
  } else {
    scrolltop.classList.remove("scrolltop--show");
  }
});

// Dark theme

// check for selected theme in localStorage
let theme = localStorage.getItem("theme");

const themeToggle = document.getElementById("theme-toggle");

const enableDarkTheme = () => {
  // Add the dark theme class to the body
  document.body.classList.add("dark-theme");
  // change the theme toggle icon
  themeToggle.classList.replace("ri-moon-line", "ri-sun-line");
  // update the selected theme in localStorage
  localStorage.setItem("theme", "dark-theme");
};

const disableDarkTheme = () => {
  // remove the dark theme class from the body
  document.body.classList.remove("dark-theme");
  // change the theme toggle icon
  themeToggle.classList.replace("ri-sun-line", "ri-moon-line");
  // update the selected theme in localStorage
  localStorage.setItem("theme", null);
};

// check if the user previously enabled the dark theme
// to load the dark theme
if (theme === "dark-theme") {
  enableDarkTheme();
}

// Add toggle theme event
themeToggle.addEventListener("click", () => {
  // get the selected theme
  theme = localStorage.getItem("theme");
  if (theme !== "dark-theme") {
    enableDarkTheme();
  } else {
    disableDarkTheme();
  }
});

// ScrollReveal Animations

const sr = ScrollReveal({
  origin: "top",
  distance: "100px",
  duration: 2500,
  reset: false,
});

sr.reveal(".home__content, .about__img, .service__content, .contact__content", {
  origin: "left",
});

sr.reveal(".home__img, .about__content, .service__info, .contact__form", {
  origin: "right",
});

sr.reveal(
  ".skills__wrapper, .counter__wrapper, .portfolio__wrapper, .testimonial__wrapper, .blog__wrapper, .footer__content",
  {
    origin: "bottom",
  }
);
