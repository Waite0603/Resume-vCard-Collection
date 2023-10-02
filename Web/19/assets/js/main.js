const header = document.getElementById("header"),
  navMenu = document.getElementById("nav-menu"),
  navOpen = document.getElementById("nav-open"),
  navClose = document.getElementById("nav-close"),
  navLinks = document.querySelectorAll(".nav__link");

/* Change header on scroll
---------------------------------------*/
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("header--scroll");
  } else {
    header.classList.remove("header--scroll");
  }
});

/* Navigation Menu
---------------------------------------*/

// Open
navOpen.addEventListener("click", () => {
  navMenu.classList.add("nav__menu--open");
});

// Close
navClose.addEventListener("click", () => {
  navMenu.classList.remove("nav__menu--open");
});

// Close the nav menu when the user clicks on each nav link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("nav__menu--open");
  });
});

/* 
Active link on scroll section 
-------------------------------------*/
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

/* 
Scrolltop 
----------------------------------------------*/
const scrolltop = document.getElementById("scrolltop");

function showScrollTop() {
  if (window.scrollY > 150) {
    scrolltop.classList.add("scrolltop--show");
  } else {
    scrolltop.classList.remove("scrolltop--show");
  }
}

window.addEventListener("scroll", showScrollTop);

/* 
Testimonial Swiper
----------------------------------------------*/
const testimonialSwiper = new Swiper(".testimonial__wrapper", {
  loop: true,
  spaceBetween: 40,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  navigation: {
    nextEl: ".swiper__next",
    prevEl: ".swiper__prev",
  },
});

/* 
ScrollReveal
----------------------------------------------*/
const sr = ScrollReveal({
  distance: "100px",
  duration: 1500,
  delay: 200,
  reset: true,
});

sr.reveal(
  ".home__content, .about__img, .testimonial__wrapper, .footer__wrapper"
);
sr.reveal(".home__img, .about__content", { origin: "top" });
sr.reveal(
  ".service__item, .skill__item, .experience__group, .portfolio__project, .blog__card",
  { interval: 100 }
);
