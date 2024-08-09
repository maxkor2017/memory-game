const switchTheme = document.querySelector(".header__btn");
const body = document.body;
const modal = document.querySelector(".modal");
const cards = document.querySelectorAll(".card");
const cancel = document.querySelector(".cancel");
const apply = document.querySelector(".apply");

let theme = "white";
let cardOne = null;
let cardTwo = null;
let matchedCards = 0;
let disable = false;
getTheme();
restartGame();

switchTheme.onclick = toggleTheme;
cancel.onclick = closeModal;
apply.onclick = restartGame;

function openModal() {
  modal.classList.add("modal-open");
}

function closeModal() {
  modal.classList.remove("modal-open");
}

function toggleTheme() {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    theme = "dark";
  } else {
    theme = "white";
  }
  saveTheme();
}

function saveTheme() {
  localStorage.setItem("theme", theme);
}

function getTheme() {
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
    if (theme == "white") {
      body.classList.remove("dark");
    } else {
      body.classList.add("dark");
    }
  } else {
    theme = "white";
  }
}

function handleClick(card) {
  if (!disable && cardOne != card) {
    card.classList.add("flip");
    if (!cardOne) {
      cardOne = card;
    } else {
      cardTwo = card;
      disable = true;
      const firstLink = cardOne.querySelector("img").src;
      const secondLink = cardTwo.querySelector("img").src;
      compareCards(firstLink, secondLink);
    }
  }
}

function compareCards(img1, img2) {
  if (img1 == img2) {
    matchedCards++;
    if (matchedCards == 8) {
      handleWin();
    }
    cardOne.onclick = null;
    cardTwo.onclick = null;
    cardOne = null;
    cardTwo = null;
    disable = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("flip", "shake");
      cardTwo.classList.remove("flip", "shake");
      cardOne = null;
      cardTwo = null;
      disable = false;
    }, 1000);
  }
}

function handleWin() {
  openModal();
}

function restartGame() {
  cardOne = null;
  cardTwo = null;
  matchedCards = 0;
  disable = false;
  const imgNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  imgNumbers.sort(() => Math.random() - 0.5);
  cards.forEach((card, i) => {
    const image = card.querySelector("img");
    image.src = `./img/img-${imgNumbers[i]}.png`;
    card.onclick = function () {
      handleClick(card);
    };
    card.classList.remove("shake", "flip");
  });
  closeModal();
}
