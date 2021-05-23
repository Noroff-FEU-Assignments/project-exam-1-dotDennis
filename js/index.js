// Import posts (url)
import { POSTS, buildCarousel, buildError } from "./components/global.js";

const carouselTrack = document.querySelector(".track");
const loader = document.querySelector(".loader");
const main = document.querySelector("main");

// fetch data from api and create carousel html
const url = `${POSTS}?_embed`;

async function fetchPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    carouselTrack.innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      // declare json data that will be used for creating the html
      carouselTrack.innerHTML += buildCarousel(json[i]);
    }

    // then select the containers made and listen for clicks for change.
    const carouselItem = document.querySelector(".post-container");
    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");

    // add carousel move 1 item at a time (setting translateX = 100% 1, 2 & max 3 new items each time the button is pressed, instead of only 1 at all screen sizes.)
    window.addEventListener("resize", checkWidth);

    let carouselItemWidth = carouselItem.getBoundingClientRect().width;

    let carouselItemsShowing = 3;

    function checkItemsShowing() {
      if (window.outerWidth >= 1500) {
        carouselItemsShowing = 3;
      } else if (window.outerWidth <= 1500 && window.outerWidth >= 1000) {
        carouselItemsShowing = 2;
      } else if (window.outerWidth <= 1000) {
        carouselItemsShowing = 1;
      } else {
        return;
      }
    }
    checkItemsShowing();

    function checkWidth() {
      carouselItemWidth = carouselItem.getBoundingClientRect().width;
      checkItemsShowing();
    }

    let direction = -1;

    prevButton.addEventListener("click", function () {
      if (direction === -1) {
        direction = 1;
        for (let i = 0; i < carouselItemsShowing; i++) {
          carouselTrack.appendChild(carouselTrack.firstElementChild);
        }
      }
      direction = 1;
      carouselTrack.style.justifyContent = `flex-end`;
      carouselTrack.style.transform = `translateX(${carouselItemWidth}px)`;
    });

    nextButton.addEventListener("click", function () {
      if (direction === 1) {
        direction = -1;
        for (let i = 0; i < carouselItemsShowing; i++) {
          carouselTrack.prepend(carouselTrack.lastElementChild);
        }
      }

      carouselTrack.style.justifyContent = `flex-start`;
      carouselTrack.style.transform = `translateX(-${carouselItemWidth}px)`;
    });

    carouselTrack.addEventListener("transitionend", function () {
      if (direction === -1) {
        carouselTrack.appendChild(carouselTrack.firstElementChild);
      } else if (direction === 1) {
        carouselTrack.prepend(carouselTrack.lastElementChild);
      }

      carouselTrack.style.transition = `none`;
      carouselTrack.style.transform = `translateX(0)`;

      setTimeout(function () {
        carouselTrack.style.transition = `transform 0.33s ease-out`;
      });
    });
  } catch (error) {
    // if there's an error - display error to user
    main.innerHTML = buildError();
    console.log(error);
  } finally {
    // remove loader
    loader.outerHTML = ``;

    // add carousel functionality (has to be done in the finally, as element has to be selected. Great if there's issues in the api call)
  }
}

fetchPosts();
