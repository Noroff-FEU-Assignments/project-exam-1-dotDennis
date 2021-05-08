// select containers
const postsContainer = document.querySelector("section");
const loader = document.querySelector(".loader");
const searchedText = document.querySelector(".search-context");

// querystirng
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

// get the id from the querystring
// let search = params.get("search");
let search = params.get("search");

let url = `https://dennisl.no/blogAPI/wp-json/relevanssi/v1/search?keyword=${search}&per_page=15&_embed`;

// change url & document.title if there's no querystring passed.
if (!search) {
  url = `https://dennisl.no/blogAPI/wp-json/wp/v2/posts?_embed&per_page=15`;
  document.title = `${document.title} Search`;
}

// run a function to fetch the data from the api

async function getSearchResults() {
  try {
    const response = await fetch(url);
    const json = await (await fetch(url)).json();
    // set document title i
    document.title = `${document.title} ${search.charAt(0).toUpperCase() + search.slice(1)}`;


    if (!response.ok) {
      searchedText.innerHTML += `<p>Search for '<strong>${search}</strong>' gave no results.</p>`;
    } else {
      if (search) {
        searchedText.innerHTML += `<p>Search for '<strong>${search}</strong>' gave ${json.length} results.</p>`;
      }
      for (let i = 0; i < json.length; i++) {
        // declarations
        postsContainer.innerHTML += buildHtml(json[i]);
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    loader.outerHTML = "";
  }
}

getSearchResults();

function buildHtml(post) {
  // declare default values
  let featuredImage = "img/placeholder-image.png";
  if (post.featured_media !== 0) {
    featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
  }
  let title = "Title missing";
  if (post.title.rendered) {
    title = post.title.rendered;
  }
  let altTxt = `Image related to ${title}`;
  if (post.featured_media !== 0) {
    if (post._embedded["wp:featuredmedia"][0].alt_text) {
      altTxt = post._embedded["wp:featuredmedia"][0].alt_text;
    }
  }
  const date = new Date(post.date);
  const format = { day: "numeric", month: "numeric", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);
  const author = post._embedded.author[0].name;

  // postsContainer.innerHTML += ``

  return `
          <div class="post-container">
            <div class="post-image">
              <img src="${featuredImage}" alt="${altTxt}" />
              <a href="post.html?post=${post.id}"></a>
            </div>
            <div class="post-info">
              <h2>${title}</h2>
              <p class="link-txt">by <a href="${author}">${author}</a> - ${dateFormatted}</p>
              <a href="post.html?post=${post.id}">Read more...</a>
            </div>
          </div>`;
}

//   const productName = json[i].name;
//   const image = json[i].images[0].src;
//   const price = json[i].price_html;
//   const rating = json[i].attributes[0].options[0];
