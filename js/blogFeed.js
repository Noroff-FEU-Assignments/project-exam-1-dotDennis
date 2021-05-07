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
      // declare json data that will be used for creating the html
      let title = "Title missing";
      if (json[i].title.rendered) {
        title = json[i].title.rendered;
      }
      let featuredImage = "img/placeholder-image.png";
      if (json[i].featured_media !== 0) {
        featuredImage = json[i]._embedded["wp:featuredmedia"][0].source_url;
      }
      const author = json[i]._embedded.author[0].name;
      // format the date
      const date = new Date(json[i].date);
      const format = { day: "numeric", month: "numeric", year: "numeric" };
      const dateFormatted = date.toLocaleString("en-GB", format);

      // build html
      productsContainer.innerHTML += `
          <div class="post-container">
            <div class="post-image">
              <img src="${featuredImage}" alt="alt-text" />
              <a href="post.html?post=${json[i].id}"></a>
            </div>
            <div class="post-info">
              <h2>${title}</h2>
              <p class="link-txt">by <a href="${author}">${author}</a> - ${dateFormatted}</p>
              <a href="post.html?post=${json[i].id}">Read more...</a>
            </div>
          </div>`;
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
