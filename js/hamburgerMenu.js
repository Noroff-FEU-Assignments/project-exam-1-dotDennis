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
  if (window.matchMedia("(min-width: 850px)").matches) {
    socialsContainer.classList.remove("expand");
    navContainer.classList.remove("expand");
  } else {
    return;
  }
}
