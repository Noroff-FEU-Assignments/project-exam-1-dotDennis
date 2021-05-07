const carouselTrack = document.querySelector(".track");
const loader = document.querySelector(".loader");
const bodyMainContainer = document.querySelector("main");

// fetch data from api and create carousel html
const url = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts?_embed";

async function getPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    carouselTrack.innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      // declare json data that will be used for creating the html
      const author = json[i]._embedded.author[0].name;

      let title = "Title missing";
      if (json[i].title.rendered) {
        title = json[i].title.rendered;
      }
      let featuredImage = "img/placeholder-image.png";
      if (json[i].featured_media !== 0) {
        featuredImage = json[i]._embedded["wp:featuredmedia"][0].source_url;
      }

      let altTxt = `Image related to ${title}`;
      if (json[i].featured_media !== 0) {
        if (json[i]._embedded["wp:featuredmedia"][0].alt_text) {
          altTxt = json[i]._embedded["wp:featuredmedia"][0].alt_text;
        }
      }
      // format the date
      const date = new Date(json[i].date);
      const format = { day: "numeric", month: "numeric", year: "numeric" };
      const dateFormatted = date.toLocaleString("en-GB", format);

      // build html
      carouselTrack.innerHTML += `
          <div class="post-container">
            <div class="post">
              <div class="img-container">
                <img src="${featuredImage}" alt="${altTxt}"/>
              </div>              
              <div class="post-info">
                <h2>${title}</h2>
                <p>By <a href="serach.html?search=${author}">${author}</a> / ${dateFormatted}</p>
              </div>
            </div>
            <a href="post.html?post=${json[i].id}" class="post-link"></a>            
          </div>`;
    }
  } catch (error) {
    // if there's an error - display error to user
    bodyMainContainer.innerHTML = `
    <div class="error">
      <p class="error-txt">Oops! - ${error}</p>
    </div>`;
    console.log(error);
  } finally {
    // remove loader
    loader.outerHTML = ``;

    // add carousel functionality (has to be done in the finally, as element has to be selected. Great if there's issues in the api call)
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
          console.log("appended" + i);
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
          console.log("prepended" + i);
        }
      }
      console.log("next");

      // direction = -1;
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
  }
}

getPosts();
