const carouselTrack = document.querySelector(".track");

// fetch data from api and create carousel html
const url = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts?_embed";

async function getPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      // declare json data that will be used for creating the html
      const title = json[i].title.rendered;
      const featuredImage = json[i]._embedded["wp:featuredmedia"][0].source_url;
      const author = json[i]._embedded.author[0].name;

      // format the date
      const date = new Date(json[i].date);
      const format = { day: "numeric", month: "numeric", year: "numeric" };
      const dateFormatted = date.toLocaleString("en-GB", format).replace(/\//g, ".");

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
                <p>By <a href="${author}">${author}</a> / ${dateFormatted}</p>
              </div>
            </div>
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
    // loader.classList.remove("loader");
    console.log("done");
    const postContainer = document.querySelectorAll(".post-container");
    const postWidth = postContainer[4].offsetWidth;

    const nextButton = document.querySelector("#next");
    const prevButton = document.querySelector("#prev");

    let clickCount = 1;

    nextButton.addEventListener("click", function () {
      if (clickCount === postContainer.length) {
        return;
      } else {
        carouselTrack.style.transform = `translateX(-${postWidth * clickCount}px)`;
        clickCount++;
      }

      console.log(clickCount);
      console.log(postContainer.length);
    });

    prevButton.addEventListener("click", function () {
      carouselTrack.style.transform = `translateX(-0px)`;
      console.log("bop-back");
      clickCount = 2;
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
