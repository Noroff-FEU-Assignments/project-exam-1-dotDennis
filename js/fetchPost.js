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
    postContainer.innerHTML = buildHtml(json);

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
function buildHtml(post) {
  // format the date
  const date = new Date(post.date);
  const format = { day: "numeric", month: "numeric", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);

  let altTxt = `Image related to ${post.title.rendered}`;

  if (post._embedded["wp:featuredmedia"][0].alt_text) {
    altTxt = post._embedded["wp:featuredmedia"][0].alt_text;
  }

  // declare lorem ipsum, if no text is avaliable (through the wp plugin)
  let p1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et volutpat purus. Pellentesque habitant morbi 
            tristique senectus et netus et malesuada fames ac turpis egestas. Cras condimentum erat erat, eget cursus nibh 
            pellentesque ac. Integer varius, velit vitae ornare vehicula, sapien libero ornare justo, in maximus diam elit nec est. 
            Vestibulum ut elit pellentesque, hendrerit augue molestie, iaculis felis. Suspendisse congue sapien sed risus dictum, 
            eget vestibulum dui sollicitudin. Mauris a enim lectus. Ut ut purus ut massa hendrerit vulputate. Cras viverra aliquam ex, 
            malesuada dapibus dolor pellentesque luctus. Aliquam erat volutpat. Vivamus consectetur dapibus erat dapibus 
            vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut elementum`;
  if (post.acf.p_1) {
    paragraph = post.acf.p_1;
  }
  let p2 = `Maecenas quis ex ac sem pretium vulputate. In finibus augue sed augue volutpat, non tempus felis lacinia. Donec vel 
            leo mi. Aliquam mattis ultrices enim vitae vestibulum. Mauris tincidunt dignissim maximus. Cras id dui et justo egestas 
            laoreet. Suspendisse mollis a nulla ut euismod. Nulla pharetra ut velit vel posuere. Praesent vitae orci eget urna porta 
            gravida ut vitae enim.
            In tincidunt mi et tortor euismod vulputate. Nulla porttitor, lorem ac tristique pellentesque, orci ipsum aliquam sem, at 
            rhoncus ligula quam ut orci. Curabitur quis vulputate purus, a luctus lectus. Nunc vitae euismod lorem, vel feugiat `;
  if (post.acf.p_2) {
    paragraph = post.acf.p_2;
  }
  let p3 = `Maecenas quis ex ac sem pretium vulputate. In finibus augue sed augue volutpat, non tempus felis lacinia. Donec vel 
            leo mi. Aliquam mattis ultrices enim vitae vestibulum. Mauris tincidunt dignissim maximus. Cras id dui et justo egestas 
            laoreet. Suspendisse mollis a nulla ut euismod. Nulla pharetra ut velit vel posuere. Praesent vitae orci eget urna porta 
            gravida ut vitae enim.

            In tincidunt mi et tortor euismod vulputate. Nulla porttitor, lorem ac tristique pellentesque, orci ipsum aliquam sem, at 
            rhoncus ligula quam ut orci. Curabitur quis vulputate purus, a luctus lectus. Nunc vitae euismod lorem, vel feugiat 
            neque. Vestibulum dictum nulla non tortor lobortis consectetur. Ut sollicitudin vulputate finibus. Etiam vel ante volutpat, 
            malesuada mauris id, ultricies leo. Praesent sagittis velit felis, at ultricies justo facilisis id. Curabitur ut placerat lorem. 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in consectetur eros. Sed ornare euismod lectus, a 
            vulputate metus placerat vitae. Pellentesque at dictum metus, id placerat lacus. Ut lorem est, tincidunt a turpis id, 
            sodales vehicula lorem. Ut ut libero eget massa malesuada tempor a in sapien.`;
  if (post.acf.p_3) {
    paragraph = post.acf.p_3;
  }

  let image_p2 = "img/placeholder-image.png";
  if (post.acf.image_p2) {
    image_p2 = post.acf.image_p2;
  }

  return `
  <nav><a href="blog.html">Blog</a> / <a href="${document.location.search}">${post.title.rendered}</a></nav>
        <header>
          <img src="${post._embedded["wp:featuredmedia"][0].source_url}" alt="${altTxt}" />
          <h2>${post.title.rendered}</h2>
          <p class="link-txt">By <a href="">${post._embedded.author[0].name}</a> - ${dateFormatted}</p>
        </header>
        <p class="blog-txt">${p1}</p>
        <div class="centre">
          <img src="${image_p2}" alt="" />
          <div>
            <h3>${post.acf.subtitle_p2}</h3>
            <p class="blog-txt">${p2}</p>
           </div>
        </div>
        <h3>${post.acf.subtitle_p3}</h3>
        <p class="blog-txt">${p3}</p>
        <div class="comment-sections"><a href="">leave a comment</a> socials icons</div>
      </article>`;
}

function test(image) {
  console.log(image + "test");
}
