const carouselTrack = document.querySelector(".track");
const loader = document.querySelector(".loader");

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
      const title = json[i].title.rendered;
      const featuredImage = json[i]._embedded["wp:featuredmedia"][0].source_url;
      const author = json[i]._embedded.author[0].name;

      // format the date
      const date = new Date(json[i].date);
      const format = { day: "numeric", month: "numeric", year: "numeric" };
      const dateFormatted = date.toLocaleString("en-GB", format);

      if (i === 0) {
        carouselTrack.innerHTML += `
          <div class="post-container">
            <div id="first" class="post current-item">
              <div class="img-container">
                <img src="${featuredImage}" alt="${title}"/>
              </div>
              <div class="post-info">
                <h2>${title}</h2>
                <p>By <a href="${author}">${author}</a> / ${dateFormatted}</p>
              </div>
            </div>
            <a href="post.html?post=${json[i].id}" class="post-link"></a>
          </div>`;
      } else {
        if (i === json.length - 1) {
          carouselTrack.innerHTML += `
          <div class="post-container">
            <div id="last" class="post">
              <div class="img-container">
                <img src="${featuredImage}" alt="${title}"/>
              </div>
              <div class="post-info">
                <h2>${title}</h2>
                <p>By <a href="${author}">${author}</a> / ${dateFormatted}</p>
              </div>
            </div>
            <a href="post.html?post=${json[i].id}" class="post-link"></a>
          </div>`;
        }
        if (i < 0 || i !== json.length - 1) {
          carouselTrack.innerHTML += `
          <div class="post-container">
            <div class="post">
              <div class="img-container">
                <img src="${featuredImage}" alt="${title}"/>
              </div>              
              <div class="post-info">
                <h2>${title}</h2>
                <p>By <a href="serach.html?search=${author}">${author}</a> / ${dateFormatted}</p>
              </div>
            </div>
            <a href="post.html?post=${json[i].id}" class="post-link"></a>            
          </div>`;
        }
      }
    }
  } catch (error) {
    // if there's an error - display error to user
    // featuredContainer.innerHTML = createError(error);
    console.log(error);
  } finally {
    // remove loader
    loader.classList.remove("loader");

    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");

    let direction = -1;

    window.addEventListener("resize", checkWidth);

    function appendChild() {
      if (window.outerWidth >= 1500) {
        carouselTrack.appendChild(carouselTrack.firstElementChild);
        carouselTrack.appendChild(carouselTrack.firstElementChild);
        carouselTrack.appendChild(carouselTrack.firstElementChild);
      } else if (window.outerWidth <= 1500 && window.outerWidth >= 1000) {
        carouselTrack.appendChild(carouselTrack.firstElementChild);
        carouselTrack.appendChild(carouselTrack.firstElementChild);
      } else if (window.outerWidth <= 1000) {
        carouselTrack.appendChild(carouselTrack.firstElementChild);
      } else {
        return;
      }
    }

    function prependChild() {
      if (window.outerWidth >= 1500) {
        carouselTrack.prepend(carouselTrack.lastElementChild);
        carouselTrack.prepend(carouselTrack.lastElementChild);
        carouselTrack.prepend(carouselTrack.lastElementChild);
      } else if (window.outerWidth <= 1500 && window.outerWidth >= 1000) {
        carouselTrack.prepend(carouselTrack.lastElementChild);
        carouselTrack.prepend(carouselTrack.lastElementChild);
      } else if (window.outerWidth <= 1000) {
        carouselTrack.prepend(carouselTrack.lastElementChild);
      } else {
        return;
      }
    }

    prevButton.addEventListener("click", function () {
      if (direction === -1) {
        direction = 1;
        appendChild();
      }
      direction = 1;
      carouselTrack.style.justifyContent = `flex-end`;
      if (window.outerWidth >= 1500) {
        carouselTrack.style.transform = `translateX(33.74%)`;
      } else if (window.outerWidth <= 1500 && window.outerWidth >= 1000) {
        carouselTrack.style.transform = `translateX(50%)`;
      } else if (window.outerWidth <= 1000) {
        carouselTrack.style.transform = `translateX(100%)`;
      }
    });

    nextButton.addEventListener("click", function () {
      if (direction === 1) {
        direction = -1;
        prependChild();
      }
      // direction = -1;
      carouselTrack.style.justifyContent = `flex-start`;
      if (window.outerWidth >= 1500) {
        carouselTrack.style.transform = `translateX(-33.74%)`;
      } else if (window.outerWidth <= 1500 && window.outerWidth >= 1000) {
        carouselTrack.style.transform = `translateX(-50%)`;
      } else if (window.outerWidth <= 1000) {
        carouselTrack.style.transform = `translateX(-100%)`;
      }
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
        carouselTrack.style.transition = `transform 0.3s ease-out`;
      });
    });
  }
}

getPosts();

// carousel track has been decalared at start of document.

// const carouselWidth = document.querySelector(".carousel-container").offsetWidth;

// console.log(document.querySelector(".carousel-container"));

// console.log(carouselWidth);

// when click next (right button), move slides towards right
// nextButton.addEventListener("click", function (event) {
//   const currentItem = carouselTrack.querySelector(".current-item");
//   const nextItem = currentItem.nextElementSibling;

//   moveToSlide(carouselTrack, currentItem, nextItem);
// });

// // when click previous (left button), move slides towards left
// prevButton.addEventListener("click", function (event) {
//   const currentItem = carouselTrack.querySelector(".current-item");
//   const previousItem = currentItem.previousElementSibling;

//   moveToSlide(carouselTrack, currentItem, previousItem);
// });
