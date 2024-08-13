let currentIndex = 0;

document.querySelector('.prev_button').addEventListener('click', () => {
  navigate(-1);
});

document.querySelector('.next_button').addEventListener('click', () => {
  navigate(1);
});

function navigate(direction) {
  let cards = document.querySelector('.cards');
  let cardProfes = document.querySelectorAll('.card_profes').length;

  currentIndex = (currentIndex + direction + cardProfes) % cardProfes;
  let offset = -currentIndex * 110;

  cards.style.transform = `translateX(${offset}%)`;
}
