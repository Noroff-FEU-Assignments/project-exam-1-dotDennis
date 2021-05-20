const productsContainer = document.querySelector("section");
const moreButton = document.querySelector(".view-more");
const loader = document.querySelector(".loader");

// fetch data from api and create carousel html
let pageCount = 1;

let url = `https://dennisl.no/blogAPI/wp-json/wp/v2/posts?page=${pageCount}&per_page=10&_embed`;

async function getPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    // remove button if:
    if (response.headers.get(["x-wp-totalpages"]) <= pageCount) {
      moreButton.outerHTML = ``;
    }

    for (let i = 0; i < json.length; i++) {
      // build html in seperate file
      productsContainer.innerHTML += blogFeed(json[i]);
    }
  } catch (error) {
    // if there's an error - display error to user
    // featuredContainer.innerHTML = createError(error);
    console.log(error);
  } finally {
    // remove loader
    loader.outerHTML = "";
    moreButton.style.display = "flex";
  }
}

getPosts();

moreButton.addEventListener("click", function () {
  pageCount++;
  // update the URL used in the GET call
  url = `https://dennisl.no/blogAPI/wp-json/wp/v2/posts?page=${pageCount}&per_page=10&_embed`;
  getPosts();
});
