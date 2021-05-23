const POSTS = "https://dennisl.no/blogAPI/wp-json/wp/v2/posts";

// querystring
const queryString = document.location.search;

const params = new URLSearchParams(queryString);

// get the id from the querystring
const ID = params.get("post");

export { POSTS, ID };

function buildCarousel(post) {
  const category = post._embedded["wp:term"][0][0].name;

  let title = "Title missing";
  if (post.title.rendered) {
    title = post.title.rendered;
  }
  let featuredImage = "img/placeholder-image.png";
  if (post.featured_media !== 0) {
    featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
  }

  let altTxt = `Image related to ${title}`;
  if (post.featured_media !== 0) {
    if (post._embedded["wp:featuredmedia"][0].alt_text) {
      altTxt = post._embedded["wp:featuredmedia"][0].alt_text;
    }
  }
  // format the date
  const date = new Date(post.date);
  const format = { day: "numeric", month: "numeric", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);
  // build html
  return `
            <div class="post-container">
              <div class="post">
                <div class="img-container">
                  <img src="${featuredImage}" alt="${altTxt}"/>
                </div>              
                <div class="post-info">
                  <h2>${title}</h2>
                  <p class="link-txt"><a href="search.html?q=${category}">${category}</a> - ${dateFormatted}</p>
                </div>
              </div>
              <a aria-label="link to post" href="post.html?post=${post.id}" class="post-link"></a>            
            </div>`;
}

function buildBlog(post) {
  // declare postta that will be used for creating the html
  let title = "Title missing";
  if (post.title.rendered) {
    title = post.title.rendered;
  }
  let featuredImage = "img/placeholder-image.png";
  if (post.featured_media !== 0) {
    featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
  }
  const category = post._embedded["wp:term"][0][0].name;

  // format the date
  const date = new Date(post.date);
  const format = { day: "numeric", month: "numeric", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);
  return `
                <div class="post-container">
              <div class="post-image">
                <img src="${featuredImage}" alt="alt-text" />
                <a aria-label="link to post" href="post.html?post=${post.id}"></a>
              </div>
              <div class="post-info">
                <h2>${title}</h2>
                <p class="link-txt"><a href="search.html?q=${category}">${category}</a> - ${dateFormatted}</p>
                <a href="post.html?post=${post.id}">Read more...</a>
              </div>
            </div>`;
}

function buildPost(post) {
  // format the date
  const date = new Date(post.date);
  const format = { day: "numeric", month: "numeric", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);

  // declare default values, if it returns false, display default.

  let title = "Title missing";
  if (post.title.rendered) {
    title = post.title.rendered;
  }

  let p1 = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et volutpat purus. Pellentesque habitant morbi 
              tristique senectus et netus et malesuada fames ac turpis egestas. Cras condimentum erat erat, eget cursus nibh 
              pellentesque ac. Integer varius, velit vitae ornare vehicula, sapien libero ornare justo, in maximus diam elit nec est. 
              Vestibulum ut elit pellentesque, hendrerit augue molestie, iaculis felis. Suspendisse congue sapien sed risus dictum, 
              eget vestibulum dui sollicitudin. Mauris a enim lectus. Ut ut purus ut massa hendrerit vulputate. Cras viverra aliquam ex, 
              malesuada dapibus dolor pellentesque luctus. Aliquam erat volutpat. Vivamus consectetur dapibus erat dapibus 
              vehicula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut elementum`;
  if (post.acf.p_1) {
    p1 = post.acf.p_1;
  }
  let p2 = `Maecenas quis ex ac sem pretium vulputate. In finibus augue sed augue volutpat, non tempus felis lacinia. Donec vel 
              leo mi. Aliquam mattis ultrices enim vitae vestibulum. Mauris tincidunt dignissim maximus. Cras id dui et justo egestas 
              laoreet. Suspendisse mollis a nulla ut euismod. Nulla pharetra ut velit vel posuere. Praesent vitae orci eget urna porta 
              gravida ut vitae enim.
              In tincidunt mi et tortor euismod vulputate. Nulla porttitor, lorem ac tristique pellentesque, orci ipsum aliquam sem, at 
              rhoncus ligula quam ut orci. Curabitur quis vulputate purus, a luctus lectus. Nunc vitae euismod lorem, vel feugiat `;
  if (post.acf.p_2) {
    p2 = post.acf.p_2;
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
    p3 = post.acf.p_3;
  }

  let image_p2 = "img/placeholder-image.png";
  if (post.acf.image_p2) {
    image_p2 = post.acf.image_p2;
  }
  let image_p2_alt = `Image related to ${title}`;
  if (post.acf.image_p2_alt) {
    image_p2_alt = post.acf.image_p2_alt;
  }

  let sub_p2 = "Chapter 1";
  if (post.acf.sub_p2) {
    sub_p2 = post.acf.sub_p2;
  }

  let sub_p3 = "Chapter 2";
  if (post.acf.sub_p3) {
    sub_p3 = post.acf.sub_p3;
  }

  let featuredImage = "img/placeholder-image.png";
  if (post.featured_media !== 0) {
    featuredImage = post._embedded["wp:featuredmedia"][0].source_url;
  }

  let altTxt = `Image related to ${title}`;
  if (post.featured_media !== 0) {
    if (post._embedded["wp:featuredmedia"][0].alt_text) {
      altTxt = post._embedded["wp:featuredmedia"][0].alt_text;
    }
  }

  let captionFeatured = `${title}`;
  if (post.acf.featuredmedia_caption) {
    captionFeatured = post.acf.featuredmedia_caption;
  }
  let mediaCaption = `${title}`;
  if (post.acf.image_p2_caption) {
    mediaCaption = post.acf.image_p2_caption;
  }

  const category = post._embedded["wp:term"][0][0].name;

  return `
          <nav>
            <a href="blog.html">Blog</a> / <a href="${document.location.search}">${title}</a>
          </nav>
          <header>
            <img src="${featuredImage}" data-caption="${captionFeatured}" alt="${altTxt}" />
            <h2>${title}</h2>
            <p class="link-txt"><a href="search.html?q=${category}">${category}</a> - ${dateFormatted}</p>
          </header>
          <p class="blog-txt">${p1}</p>
          <div class="centre">
            <img src="${image_p2}" data-caption="${mediaCaption}" alt="${image_p2_alt}" />
            <div>
              <h3>${sub_p2}</h3>
              <p class="blog-txt">${p2}</p>
             </div>
          </div>
          <h3>${sub_p3}</h3>
          <p class="blog-txt">${p3}</p>
          <div class="button-container">
            <button class="comment-btn" id="expandComments" type="button">Leave a comment</button>
          </div>
          <nav>
              <ul class="icons-container">
                <li>
                  <a aria-label="Open LinkedIn" target="_blank" rel="noopener" href="https://linkedin.com/in/dotdennis" class="social-icon"><i class="fab fa-linkedin"></i></a>
                </li>
                <li>
                  <a aria-label="Open Facebook" target="_blank" rel="noopener" href="https://www.facebook.com/dennisloevold" class="social-icon"><i class="fab fa-facebook-square"></i></a>
                </li>
                <li>
                  <a aria-label="Open Github" target="_blank" rel="noopener" href="https://github.com/dotDennis" class="social-icon"><i class="fab fa-github"></i></a>
                </li>
                <li>
                  <a aria-label="Open Twitter" target="_blank" rel="noopener" href="https://twitter.com/d0tDennis" class="social-icon"><i class="fab fa-twitter"></i></a>
                </li>
              </ul>
            </nav>
        </article>`;
}

function buildModal(src, alt, caption) {
  return `
    <div class="modal">
      <div class="modal-content">
          <button class="modal-close"><i class="fas fa-times"></i></button>
        <figure>
          <img src="${src}" class="modal-img" alt="${alt}">
          <figcaption class="modal-txt">${caption}</figcaption>
        </figure>
      </div>
    </div>`;
}
function buildComments(comment) {
  const date = new Date(comment.date);
  const format = { day: "numeric", month: "long", year: "numeric" };
  const dateFormatted = date.toLocaleString("en-GB", format);
  return `
              <div>
                 <header class="comment-header">
                     <img src="${comment.author_avatar_urls[96]}" alt="${
    comment.author_name
  }'s avatar">
                     <h3>${comment.author_name}</h3>
                     <span>·</span>
                     <p>${dateFormatted + " " + comment.date.split("T")[1].substring(0, 5)}</p>
                 </header>
                 <section class="comment-content">
                     ${comment.content.rendered}
                 </section>
             </div>`;
}
function buildError() {
  return `
      <section>
        <div class="status">
          <p class="status-txt">Oops! Something went wrong while building the site. Please contact Dennis if this issue persists</p>
        </div>
      </section>`;
}
function buildContactError(errorMessage) {
  return `
        <div class="status">
          <p class="status-txt">Oops! ${errorMessage}</p>
        </div>`;
}

export {
  buildCarousel,
  buildBlog,
  buildPost,
  buildModal,
  buildComments,
  buildError,
  buildContactError,
};
