// declare containers & elements
const form = document.querySelector(".contact-form");
const successContainer = document.querySelector("#successContainer");
const submitButton = document.querySelector(".contact-btn");

// Validate input values

// Regex to check if the email is valid, returns ? true : false
function validateEmail(email) {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

// DOM form input elements, credits to Kasper
const formInputs = () => [
  form["firstName"],
  form["lastName"],
  form["email"],
  form["subject"],
  form["message"],
];

// apply error styling to item(s) passed in as through 'input'. uses (input.target) = false if it's an eventlistener, and (input.target) = true if it's not.
// because the eventListener does not have a .target value
// credit to Kasper on the true/false check inside a variable!
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

// Self explanatory? "if" inputName = firstName run case "firstName": return boolean ? true : false.
function isInputValid(inputName) {
  switch (inputName) {
    case "firstName":
      return checkLength(firstName, 3);
    case "lastName":
      return checkLength(lastName, 3);
    case "email":
      return validateEmail(email);
    case "subject":
      return checkLength(subject, 15);
    case "message":
      return checkLength(message, 25);
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
  const [firstName, lastName, email, subject, message] = formInputs();
  const isInputValidArr = [
    checkLength(firstName, 3),
    checkLength(lastName, 3),
    validateEmail(email),
    checkLength(subject, 15),
    checkLength(message, 25),
  ];

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
function handleSubmit() {
  if (!validForm()) {
    submitCheckAll();
    successContainer.innerHTML = ``;
  } else {
    form.reset();
    successContainer.innerHTML = `<p> Your message has been sent! Wohoo! </p>`;
    formInputs().forEach((input) => {
      input.removeAttribute("style");
    });
    window.scrollTo(0, 0);
  }
}

// submit form event listener
submitButton.addEventListener("click", handleSubmit);
