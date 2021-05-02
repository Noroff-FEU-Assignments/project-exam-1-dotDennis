const navButton = document.querySelector(".main-nav-mobile");
const navContainer = document.querySelector(".main-navigation");
const socialsButton = document.querySelector(".socials");
const socialsContainer = document.querySelector(".social-icons");

navButton.addEventListener("click", addClass);
socialsButton.addEventListener("click", addClass);

function addClass(event) {
  // main-nav expand
  if (event.target.classList.contains("fa-bars")) {
    event.target.outerHTML = `<i class="fas fa-times main-nav"></i>`;
    if (navContainer.classList.contains("slide-out") || navContainer.classList.contains("wait")) {
      navContainer.classList.add("slide-in");
      navContainer.classList.remove("wait");
      navContainer.classList.remove("slide-out");
      if (socialsContainer.classList.contains("slide-in")) {
        socialsContainer.classList.remove("slide-in");
        socialsContainer.classList.add("slide-out");
        socialsButton.innerHTML = `<i class="fas fa-ellipsis-h"></i>`;
      }
    }
  } else if (event.target.classList.contains("main-nav")) {
    event.target.outerHTML = `<i class="far fa-bars"></i>`;
    navContainer.classList.remove("slide-in");
    navContainer.classList.add("slide-out");
  }

  // socials expand
  if (event.target.classList.contains("fa-ellipsis-h")) {
    event.target.outerHTML = `<i class="fas fa-times socials-nav"></i>`;
    if (socialsContainer.classList.contains("slide-out") || socialsContainer.classList.contains("wait")) {
      socialsContainer.classList.add("slide-in");
      socialsContainer.classList.remove("wait");
      socialsContainer.classList.remove("slide-out");
      if (navContainer.classList.contains("slide-in")) {
        navContainer.classList.remove("slide-in");
        navContainer.classList.add("slide-out");
        navButton.innerHTML = `<i class="far fa-bars"></i>`;
      }
    }
  } else if (event.target.classList.contains("socials-nav")) {
    event.target.outerHTML = `<i class="fas fa-ellipsis-h"></i>`;
    socialsContainer.classList.remove("slide-in");
    socialsContainer.classList.add("slide-out");
  }
}

window.addEventListener("resize", checkWidth);

function checkWidth() {
  // re-style objects
  if (window.matchMedia("(min-width: 1000px)").matches) {
    socialsContainer.classList.remove("slide-out", "slide-in");
    navContainer.classList.remove("slide-out", "slide-in");
    socialsContainer.className = "social-icons wait";
    navContainer.className = "main-navigation wait";
    navButton.innerHTML = `<i class="far fa-bars"></i>`;
    socialsButton.innerHTML = `<i class="fas fa-ellipsis-h"></i>`;
    navContainer.style.position = "relative";
    navContainer.style.paddingBottom = "1rem";
  } else {
    logoContainer.classList.remove("display-none");
    navContainer.style.position = "fixed";
    navContainer.style.paddingBottom = "0";
    mainNavLinks.forEach((element) => {
      element.style.fontSize = "34px";
      element.style.color = "var(--off-white)";
    });
  }
}

window.addEventListener("scroll", checkScroll);

// select containers
const logoContainer = document.querySelector(".logo-link");
const navWrapper = document.querySelector(".menu-wrapper");
const mainNavLinks = document.querySelectorAll(".main-navigation .nav-link");
const mainContainer = document.querySelector("main");

// remove logo on scroll + move some object around
function checkScroll() {
  if (screen.width >= 1000) {
    if (window.scrollY >= 50) {
      logoContainer.classList.add("display-none");
      logoContainer.classList.remove("display-block");
      navContainer.style.position = "absolute";
      navContainer.style.paddingBottom = "0";
      navContainer.position;
      mainNavLinks.forEach((element) => {
        element.style.padding = "0 10px";
        element.style.fontSize = "34px";
        element.style.color = "var(--accent)";
      });
    } else {
      if (window.scrollY === 0) {
        logoContainer.classList.add("display-block");
        logoContainer.classList.remove("display-none");
        navContainer.style.position = "relative";
        navContainer.style.paddingBottom = "1rem";
        mainNavLinks.forEach((element) => {
          element.style.padding = "0 5rem";
          element.style.fontSize = "34px";
          element.style.color = "var(--off-white)";
        });
      }
    }
  } else {
    return;
  }
}
