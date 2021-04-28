const carouselContainer = document.querySelector(".carousel__items");
const nextButton = document.querySelector(".right");
const previousButton = document.querySelector(".left");

// fetch data from api and create carousel html
const url = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts?_embed";

async function getPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    for (let i = 0; i < json.length; i++) {
      // declarations
      const title = json[i].title.rendered;
      const featuredImage = json[i]._embedded["wp:featuredmedia"][0].media_details.sizes.large.source_url;
      const author = json[i]._embedded.author[0].name;
      const date = json[i].date;
      // const imageTest = json[i]._embedded["wp:attachment"];

      console.log(title);
      console.log(featuredImage);
      console.log(author);
      console.log(date);

      if (title) {
        carouselContainer.innerHTML += `<div class="carousel__post post-${[i]} current-item">
              <img class="item__image" src="${featuredImage}" alt="${title}" />
              <h2>${title}</h2>
              <p>By <a href="${author}">${author}</a> / ${date}</p>
            </div>`;
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
    const items = Array.from(carouselContainer.children);

    const itemWidth = items[0].getBoundingClientRect().width;
    for (let i = 0; i < items.length; i++) {
      items[i].style.left = itemWidth * i + "px";
    }
  }
}

getPosts();

// Arrange items & set position next to eachother

function moveToSlide(container, currentItem, targetItem) {
  if (!targetItem) {
    // if (targetItem.getBoundingClientRect().width > 500) Implement wordpress blog posts api to fetch if ID = 1, or if ID > apiJSON.length
  } else {
    container.style.transform = "translateX(-" + targetItem.style.left + ")";
    currentItem.classList.remove("current-item");
    targetItem.classList.add("current-item");
  }
}

// when click previous (left button), move slides towards left
previousButton.addEventListener("click", function (event) {
  const currentItem = carouselContainer.querySelector(".current-item");
  const previousItem = currentItem.previousElementSibling;

  moveToSlide(carouselContainer, currentItem, previousItem);
});

// when click next (right button), move slides towards right
nextButton.addEventListener("click", function (event) {
  const currentItem = carouselContainer.querySelector(".current-item");
  const nextItem = currentItem.nextElementSibling;

  moveToSlide(carouselContainer, currentItem, nextItem);
});
