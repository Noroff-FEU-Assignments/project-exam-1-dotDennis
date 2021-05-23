// Import posts (url)
import { POSTS, buildBlog, buildError } from "./components/global.js";

const productsContainer = document.querySelector("section");
const moreButton = document.querySelector(".view-more");
const loader = document.querySelector(".loader");
const main = document.querySelector("main");

// fetch data from api and create carousel html
let pageCount = 1;

let url = `${POSTS}?page=${pageCount}&per_page=10&_embed`;

async function fetchPosts() {
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
      productsContainer.innerHTML += buildBlog(json[i]);
    }
  } catch (error) {
    // if there's an error - display error to user
    main.innerHTML = buildError();
    console.log(error);
  } finally {
    // remove loader
    loader.style.display = "none";

    moreButton.style.display = "flex";
  }
}

fetchPosts();

moreButton.addEventListener("click", function () {
  pageCount++;
  // update the URL used in the GET call
  url = `https://dennisl.no/blogAPI/wp-json/wp/v2/posts?page=${pageCount}&per_page=10&_embed`;
  fetchPosts();
});
