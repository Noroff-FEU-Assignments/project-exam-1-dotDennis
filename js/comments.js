const commentCount = document.querySelector(".comment-count");
const commentsAPI = "https://dennisl.no/blogAPI/wp-json/wp/v2/comments";

async function fetchComments() {
  const response = await fetch(commentsAPI);
  const json = await response.json();
  const comments = json.filter((comment) => (comment.post === parseInt(id)));
  return buildCommentSection(comments);
};

fetchComments();

function buildCommentSection(commentsArr) {
  commentSection.firstElementChild.nextElementSibling.innerHTML = ""

  if (commentsArr.length) {
    commentSection.firstElementChild.innerHTML = `<h3>Comments(${commentsArr.length})</h3>`;
  }

  commentsArr.forEach((comment) => {
    const date = new Date(comment.date);
    const format = { day: "numeric", month: "long", year: "numeric" };
    const dateFormatted = date.toLocaleString("en-GB", format);

    commentSection.firstElementChild.nextElementSibling.innerHTML += `
             <div>
                 <header class="comment-header">
                     <img src="${comment.author_avatar_urls[96]}" alt="${comment.author_name}'s avatar">
                     <h3>${comment.author_name}</h3>
                     <span>·</span>
                     <p>${dateFormatted + " " + comment.date.split("T")[1].substring(0, 5)}</p>
                 </header>
                 <section class="comment-content">
                     ${comment.content.rendered}
                 </section>
             </div>`;
  });
}


/* Posting new comments */

// Validate data sent into form:
const form = document.querySelector(".comment-form");
const submitButton = document.querySelector(".comment-send-btn");

function validateEmail(email) {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const patternMatches = regEx.test(email.value);
  return patternMatches;
}

// check if input larger or equal to minLength of 'x'
function checkLength(input, minLen) {
  if (input.value.trim().length >= minLen) {
    return true;
  } else {
    return false;
  }
}

// DOM form input elements, credits to Kasper for teaching me this
const formInputs = () => [form["commentName"], form["commentEmail"], form["commentMessage"]];

// apply error styling to item(s) passed in as through 'input'. uses (input.target) = false if it's an eventlistener, and (input.target) = true if it's not.
// because the eventListener does not have a .target value
function errorStyling(input) {
  const target = input.target ? input.composedPath()[0] : form[input];
  target.style.borderBottom = "2px solid var(--warn)";
  target.nextElementSibling.style.display = "block";
}

// apply success styling to item(s)
function successStyling(input) {
  const target = input.target ? input.composedPath()[0] : form[input];
  target.style.borderBottom = "2px solid var(--accent)";
  target.nextElementSibling.style.display = "none";
}

// "if" inputName = email run case "email": return boolean ? true : false (true false is returned from the function ran inside the case).
function isInputValid(inputName) {
  switch (inputName) {
    case "commentName":
      return checkLength(commentName, 5);
    case "commentEmail":
      return validateEmail(commentEmail);
    case "commentMessage":
      return checkLength(commentMessage, 25);
    default:
      return false;
  }
}

// Function connected from event listener, to check for input changes. Then check if its valid, then apply respsctive styling
function inputCheckValid(el) {
  const input = el.target.name;
  if (!isInputValid(input)) {
    errorStyling(el);
  }
  if (isInputValid(input)) {
    successStyling(el);
  }
}

// add input event listener
formInputs().forEach((element) => {
  element.addEventListener("input", inputCheckValid);
});

// 'Submit' (button click) form part of the validation

// If this is passed, form is valid.
function validForm() {
  const [commentName, commentEmail, commentMessage] = formInputs();
  const isInputValidArr = [checkLength(commentName, 5), validateEmail(commentEmail), checkLength(commentMessage, 25)];

  // if n (in this case, the array objects) === true, it will return true, otherwise no return.
  function isTrue(n) {
    return n === true;
  }

  // every object in the array gets passed through the 'isTrue' function, return boolean ? true:false
  const isFormValid = isInputValidArr.every(isTrue);
  return isFormValid;
}

// function check every input through a switch statement if it's valid. If this returns true, apply successStyling, else if return = false, apply errorStyling.
function submitCheckAll() {
  formInputs().forEach(function (input) {
    isInputValid(input.name) ? successStyling(input.name) : errorStyling(input.name);
  });
}

// on button click, check if form is valid, it form isn't valid, check all inputs & apply respective styling to them induvidually.
// else clear the form & display a success message
async function postComment() {
  const [commentName, commentEmail, commentMessage] = formInputs()
  const commentData = JSON.stringify({
    author_name: commentName.value,
    author_email: commentEmail.value,
    content: commentMessage.value,
    post: id,
  });

  const options = {
    headers: { "Content-Type": "application/json"},
    body: commentData,
    method: "post",
  }

  if (!validForm()) {
    submitCheckAll();
    // successContainer.innerHTML = ``;
  } else {
    submitButton.innerHTML = "posting..."

    try {
      const response = await fetch(commentsAPI, options)
      submitButton.innerHTML = "post"
      if (response.ok) {
        form.reset()
        fetchComments()
        // successContainer.innerHTML = "posted!... Sucess!! wooo!"
      }
    } catch(error) {
      const json = await response.json()
      console.log(json)
      submitButton.innerHTML = "post"
      return json;
    }
  }
}


// submit form event listener
submitButton.addEventListener("click", postComment);
