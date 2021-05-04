const productsContainer = document.querySelector("section");
// const loader = document.querySelector(".loader");

// fetch data from api and create carousel html
const url = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts?_embed";

async function getPosts() {
  try {
    // await response then await json
    const response = await fetch(url);
    const json = await response.json();

    productsContainer.innerHTML = "";

    for (let i = 0; i < json.length; i++) {
      // declare json data that will be used for creating the html
      let title = "Title missing";
      if (json[i].title.rendered) {
        title = json[i].title.rendered;
      }
      let featuredImage = "img/placeholder-image.png";
      if (json[i]._embedded["wp:featuredmedia"][0].source_url) {
        featuredImage = json[i]._embedded["wp:featuredmedia"][0].source_url;
      }
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
              <p class="link-txt">by <a href="${json[i]._embedded.author[0].name}">dennissloevold</a> - ${dateFormatted}</p>
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
    // loader.classList.remove("loader");
  }
}

getPosts();

