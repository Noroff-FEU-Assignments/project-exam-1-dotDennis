const carouselContainer = document.querySelector(".carousel__items");
const items = Array.from(carouselContainer.children);
const nextButton = document.querySelector(".right");
const previousButton = document.querySelector(".left");

const itemWidth = items[0].getBoundingClientRect().width;

console.log(itemWidth);

// Arrange items & set position next to eachother
for (let i = 0; i < items.length; i++) {
  items[i].style.left = itemWidth * i + "px";
}

function moveToSlide(container, currentItem, targetItem) {
  if (!targetItem) {
    // if (targetItem.getBoundingClientRect().width > 500) Implement wordpress blog posts api to fetch if ID = 1, or if ID > apiJSON.length
  } else {
    container.style.transform = "translateX(-" + targetItem.style.left + ")";
    currentItem.classList.remove("current-item");
    targetItem.classList.add("current-item");
  }
}

// when click previous (left button), move slides towards left
previousButton.addEventListener("click", function (event) {
  const currentItem = carouselContainer.querySelector(".current-item");
  const previousItem = currentItem.previousElementSibling;

  moveToSlide(carouselContainer, currentItem, previousItem);
});

// when click next (right button), move slides towards right
nextButton.addEventListener("click", function (event) {
  const currentItem = carouselContainer.querySelector(".current-item");
  const nextItem = currentItem.nextElementSibling;

  moveToSlide(carouselContainer, currentItem, nextItem);
});
