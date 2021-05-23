// select containers
const navButton = document.querySelector(".main-nav-mobile");
const navContainer = document.querySelector(".main-navigation");
const socialsButton = document.querySelector(".socials");
const socialsContainer = document.querySelector(".social-icons");

navButton.addEventListener("click", addClass);
socialsButton.addEventListener("click", addClass);

function setContainerOut(container) {
  container.classList.remove("slide-in");
  container.classList.add("slide-out");
}

function setContainerIn(container) {
  container.classList.add("slide-in");
  container.classList.remove("wait");
  container.classList.remove("slide-out");
}

function addClass(event) {
  // main-nav expand
  if (event.target.classList.contains("fa-bars")) {
    event.target.outerHTML = `<i class="fas fa-times main-nav"></i>`;
    if (navContainer.classList.contains("slide-out") || navContainer.classList.contains("wait")) {
      setContainerIn(navContainer);
      if (socialsContainer.classList.contains("slide-in")) {
        setContainerOut(socialsContainer);
        socialsButton.innerHTML = `<i class="fas fa-ellipsis-h"></i>`;
      }
    }
  } else if (event.target.classList.contains("main-nav")) {
    event.target.outerHTML = `<i class="far fa-bars"></i>`;
    setContainerOut(navContainer);
  }

  // socials expand
  if (event.target.classList.contains("fa-ellipsis-h")) {
    event.target.outerHTML = `<i class="fas fa-times socials-nav"></i>`;
    if (socialsContainer.classList.contains("slide-out") || socialsContainer.classList.contains("wait")) {
      setContainerIn(socialsContainer);
      if (navContainer.classList.contains("slide-in")) {
        setContainerOut(navContainer);
        navButton.innerHTML = `<i class="far fa-bars"></i>`;
      }
    } //else reset
  } else if (event.target.classList.contains("socials-nav")) {
    setContainerOut(socialsContainer);
    event.target.outerHTML = `<i class="fas fa-ellipsis-h"></i>`;
  }
}

// restyle html objects if screen gets resized. To avoid issues.
window.addEventListener("resize", checkWidth);

function checkWidth() {
  // re-style objects
  if (window.matchMedia("(min-width: 1080px)").matches) {
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
      element.removeAttribute("style");
    });
  }
}

// select containers
const logoContainer = document.querySelector(".logo-link");
const navWrapper = document.querySelector(".menu-wrapper");
const mainNavLinks = document.querySelectorAll(".main-navigation .nav-link");

// the warpper is sticky, but remove some styling on it after > 50Y
window.addEventListener("scroll", checkScroll);

function displayBlock(logo, nav, navLinks) {
  logo.classList.add("display-block");
  logo.classList.remove("display-none");
  nav.removeAttribute("style");
  navLinks.forEach((element) => {
    element.classList.remove("scrolled");
  });
}

function displayNone(logo, nav, navLinks) {
  logo.classList.add("display-none");
  logo.classList.remove("display-block");
  nav.style.position = "absolute";
  nav.style.paddingBottom = "0";
  navLinks.forEach((element) => {
    element.classList.add("scrolled");
  });
}

// remove logo on scroll + move some object around
function checkScroll() {
  if (window.outerWidth >= 1080) {
    if (window.scrollY >= 50) {
      displayNone(logoContainer, navContainer, mainNavLinks);
    } else {
      if (window.scrollY === 0) {
        displayBlock(logoContainer, navContainer, mainNavLinks);
      }
    }
  } else {
    return;
  }
}
