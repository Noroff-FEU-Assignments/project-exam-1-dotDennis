// Import posts (url)
import { POSTS, ID, buildPost, buildModal, buildError } from "../js/components/global.js";

// select containers
const postContainer = document.querySelector(".post-container");
const modalContainer = document.querySelector(".modals");
const main = document.querySelector("main");
const loader = document.querySelector(".loader");

const api = `${POSTS}/${ID}?_embed`;

// redirect if id = null;
if (!ID) {
  location.href = "/";
}

// run a function to fetch the data from the api
async function fetchPost() {
  try {
    const response = await fetch(api);
    const json = await response.json();
    postContainer.innerHTML = buildPost(json);

    const commentButton = document.querySelector("#expandComments");

    commentButton.addEventListener("click", expandComments);

    document.title = `${document.title} ${json.title.rendered}`;
  } catch (error) {
    main.innerHTML = buildError();
    console.log(error);
  } finally {
    loader.outerHTML = "";

    // Modal (get a full-view of image, fullscreen on mobile with X in top right.)
    const postImages = document.querySelectorAll(".post-container img");
    postImages.forEach((el, index) => {
      modalContainer.innerHTML += buildModal(el.src, el.alt, el.dataset.caption);
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

const commentSection = document.querySelector(".comment-section");
function expandComments() {
  commentSection.style.display = "flex";
  document.querySelector("#expandComments").style.display = "none";
}

export { commentSection };
