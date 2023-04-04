let carouselItems = document.querySelectorAll('.carousel-item');
let currentIndex = 1;
const texts = ['Math Game', 'Random Word Search', 'Snake Game'];
let carouselText = document.querySelector('.carousel-text');

function updateCarousel() {
  carouselItems.forEach((item, index) => {
    item.style.transform = `translateX(calc(${index - currentIndex} * 350%)) scale(${index === currentIndex ? 4 : 1.5})`;

    carouselText.textContent = texts[currentIndex];
  });
}

function rotateLeft() {
  currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
  updateCarousel();
}

function rotateRight() {
  currentIndex = (currentIndex + 1) % carouselItems.length;
  updateCarousel();
}

function moveCarousel(direction) {
  const carouselWidth = carousel.offsetWidth;
  const itemWidth = carouselItems[0].offsetWidth;
  const itemsPerMove = 1;

  if (direction === "next") {
    carouselPosition -= itemWidth * itemsPerMove;
    if (carouselPosition <= -(carouselWidth - itemWidth)) {
      carouselPosition = 0;
    }
  } else {
    carouselPosition += itemWidth * itemsPerMove;
    if (carouselPosition > 0) {
      carouselPosition = -(carouselWidth - itemWidth);
    }
  }



}
updateCarousel();
