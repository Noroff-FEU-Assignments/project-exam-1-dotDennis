// select containers
const postContainer = document.querySelector("article");

// querystirng
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

// get the id from the querystring
const id = params.get("post");

const url = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts";

const api = `${url}/${id}?_embed`;

// redirect if id = null;
if (!id) {
  location.href = "index.html";
}

// run a function to fetch the data from the api
async function fetchPost() {
  try {
    const json = await (await fetch(api)).json();

    // build html in individual file
    postContainer.innerHTML = postSpecific(json);
    document.title = `${document.title} ${json.title.rendered}`;
  } catch (error) {
    console.log(error);
  } finally {
    postContainer.classList.remove("loader");
    postContainer.classList.add("post-container");

    // lightbox effect (get a full-view of image, fullscreen on mobile with X in top right.)
    const postImages = document.querySelectorAll(".post-container img");
    postImages.forEach((el) => {
      el.addEventListener("click", function () {
        el.classList.toggle("focused");
      });
    });
  }
}

fetchPost();

//once data has been fetched, build the HTML

function test(image) {
  console.log(image + "test");
}
