function blogFeed(post) {
  // declare json data that will be used for creating the html
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
              <a href="post.html?post=${post.id}"></a>
            </div>
            <div class="post-info">
              <h2>${title}</h2>
              <p class="link-txt"><a href="search.html?search=${category}">${category}</a> - ${dateFormatted}</p>
              <a href="post.html?post=${post.id}">Read more...</a>
            </div>
          </div>`;
}

function postSpecific(post) {
    // format the date
    const date = new Date(post.date);
    const format = { day: "numeric", month: "numeric", year: "numeric" };
    const dateFormatted = date.toLocaleString("en-GB", format);

    // declare default values, if it returns false, display default.
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

    let subtitle_p2 = "Chapter 1";
    if (post.acf.image_p2) {
        subtitle_p2 = post.acf.subtitle_p2;
    }

    let subtitle_p3 = "Chapter 2";
    if (post.acf.image_p3) {
        subtitle_p3 = post.acf.subtitle_p3;
    }

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

    const category = post._embedded["wp:term"][0][0].name;

    return `
  <nav><a href="blog.html">Blog</a> / <a href="${document.location.search}">${title}</a></nav>
        <header>
          <img src="${featuredImage}" alt="${altTxt}" />
          <h2>${title}</h2>
          <p class="link-txt"><a href="search.html?search=${category}">${category}</a> - ${dateFormatted}</p>
        </header>
        <p class="blog-txt">${p1}</p>
        <div class="centre">
          <img src="${image_p2}" alt="" />
          <div>
            <h3>${subtitle_p2}</h3>
            <p class="blog-txt">${p2}</p>
           </div>
        </div>
        <h3>${subtitle_p3}</h3>
        <p class="blog-txt">${p3}</p>
        <div class="comment-section">
          <a href="">leave a comment</a>
        </div>
        <nav>
            <ul class="icons-container">
              <li>
                <a target="_blank" href="http://linkedin.com/in/dotdennis" class="social-icon"><i class="fab fa-linkedin"></i></a>
              </li>
              <li>
                <a target="_blank" href="http://instagram.com/dennisloevold" class="social-icon"><i class="fab fa-facebook-square"></i></a>
              </li>
              <li>
                <a target="_blank" href="http://github.com/dotDennis" class="social-icon"><i class="fab fa-github"></i></a>
              </li>
              <li>
                <a target="_blank" href="https://twitter.com/d0tDennis" class="social-icon"><i class="fab fa-twitter"></i></a>
              </li>
            </ul>
          </nav>
      </article>`;
}
