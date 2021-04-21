const navButton = document.querySelector(".main-nav-mobile");
const navContainer = document.querySelector(".main-navigation");
const socialsButton = document.querySelector(".socials");
const socialsContainer = document.querySelector(".social-icons");

navButton.addEventListener("click", addClass);
socialsButton.addEventListener("click", addClass);

function addClass(event) {
  if (event.target.className === "far fa-bars") {
    navContainer.classList.toggle("expand");
    socialsContainer.classList.remove("expand");
  }
  if (event.target.className === "fas fa-ellipsis-h") {
    socialsContainer.classList.toggle("expand");
    navContainer.classList.remove("expand");
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
