// select containers
const postContainer = document.querySelector("article");
const modalContainer = document.querySelector(".modals");

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
    postImages.forEach((el, index) => {
      modalContainer.innerHTML += buildModal(el.src, el.alt);
      el.addEventListener("click", function () {
        modalArr[index].style.display = "block";
      });
    });

    const modalArr = document.querySelectorAll(".modal");

    modalArr.forEach((el) => {
      el.addEventListener("click", function (clicked) {
        if (clicked.target.classList[0] !== "modal-img") {
          el.removeAttribute("style");
        }
      });
    });
  }
}

fetchPost();
