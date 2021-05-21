// select containers
const postsContainer = document.querySelector("section");
const loader = document.querySelector(".loader");
const searchedText = document.querySelector(".search-context");
const main = document.querySelector("main");

// querystirng
const queryString = document.location.search;
const params = new URLSearchParams(queryString);

// get the id from the querystring
// let search = params.get("search");
let search = params.get("q");

let url = `https://dennisl.no/blogAPI/wp-json/wp/v2/posts?search=${search}&per_page=50&_embed`;

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
    if (search) {
      document.title = `${document.title} ${search.charAt(0).toUpperCase() + search.slice(1)}`;
    }

    if (!response.ok) {
      searchedText.innerHTML = `<p>Search for '<strong>${search}</strong>' gave no results.</p> ${searchedText.innerHTML}`;
    } else {
      if (search) {
        searchedText.innerHTML = `<p>Search for '<strong>${search}</strong>' gave ${json.length} results.</p> ${searchedText.innerHTML}`;
      }
      for (let i = 0; i < json.length; i++) {
        // build html in seperate file
        postsContainer.innerHTML += blogFeed(json[i]);
      }
    }
  } catch (error) {
    main.innerHTML = buildError()
    console.log(error);
  } finally {
    loader.outerHTML = "";
  }
}

getSearchResults();

//   const productName = json[i].name;
//   const image = json[i].images[0].src;
//   const price = json[i].price_html;
//   const rating = json[i].attributes[0].options[0];
