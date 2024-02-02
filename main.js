class Card {
  _open = false;
  _success = false;

  constructor(container, cardValue, flip, numberOfCards = 4) {
    this.createElement(container, flip, numberOfCards);
    this.cardValue = cardValue;
  }

  createElement(container, flip, numberOfCards) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.style.width = `calc((100% - ${numberOfCards * 10}px) / ${numberOfCards})`;

    this.card.addEventListener('click', () => {
      if (!this.open && !this._success) {
        this.open = true;
        flip(this);
      }
    })

    container.append(this.card);

    return this.card;
  }

  set cardValue(value) {
    this._cardValue = value;
  }

  get cardValue() {
    return this._cardValue;
  }

  set open(value) {
    this._open = value;
    if (this._open) {
      this.card.classList.add('open');
      this.card.textContent = this.cardValue;
    } else {
      this.card.classList.remove('open');
      if (!this.success) this.card.textContent = '';
    }
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    this.card.classList.add('success');
  }

  get success() {
    return this._success;
  }
}

class AmazingCard extends Card {
  
  set cardValue(value) {
    this._cardValue = value;

    const imgArray = [
        './img/cake.jpg',
        './img/cat.jpg',
        './img/crown.jpg',
        './img/dino.jpg',
        './img/ghost.jpg',
        './img/nutella.jpg',
        './img/rainbow.jpg',
        './img/sun.jpg',
        './img/among.jpg',
        './img/bear.jpg',
        './img/cactus.jpg',
        './img/chicken.jpg',
        './img/coala.jpg',
        './img/mouse.jpg',
        './img/paints.jpg',
        './img/panda.jpg',
        './img/patric.jpg',
        './img/pig.jpg',
        './img/plant.jpg',
        './img/snow.jpg',
      ]
    const img = document.createElement('img');
    img.src = imgArray[value - 1];
    this.card.append(img);
  }

  get cardValue() {
    return this._cardValue;
  }

  set open(value) {
    this._open = value;
    if (this._open) {
      this.card.classList.add('open');
    } else {
      this.card.classList.remove('open');
    }
  }

  get open() {
    return this._open;
  }
}


function flip(card) {
  if (openCards.length === 2) {
    openCards[0].open = false;
    openCards[1].open = false;
    openCards = [];
  }

  openCards.push(card);

  if (openCards.length === 2) {
    if (openCards[0].cardValue === openCards[1].cardValue) {
      openCards[0].success = true;
      openCards[1].success = true;

      successCardsCount += 2;
      if (successCardsCount === numberOfCards) {
        gameOver(true);
      }
    }
  }
}

function createNumbersArray(count) {
  for (let i = 1; i <= count / 2; i++) {
    numbersArray.push(i, i);
  }

  let j, temp;
  for (let i = numbersArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    temp = numbersArray[i];
    numbersArray[i] = numbersArray[j];
    numbersArray[j] = temp;
  }
}

function newGame() {
  cardList.innerHTML = '';

  numbersArray = [];
  openCards = [];
  successCardsCount = 0;

  clearInterval(timerId);
  
  const timer = document.querySelector('.timer');
  timer.textContent = 60;

  timerId = setInterval(() => {
    if (timer.textContent > 0) {
      timer.textContent = parseInt(timer.textContent) - 1;
    } else gameOver(false);
  }, 1000);
}

function gameOver(win) {
  clearInterval(timerId);
  cardList.innerHTML = '';
  const btn = document.querySelector('.btn');
  btn.disabled = true;
  
  const banner = document.querySelector('.banner');
  const bannerText = document.querySelector('.banner-text');
  const again = document.querySelector('.again');
  banner.style.display = 'block';
  if (win) {
    bannerText.textContent = 'Поздравляю, вы победили!'
  } else {
    bannerText.textContent = 'Время вышло, попробуйте сыграть еще раз';
  }
  again.addEventListener('click', () => {
    location.reload();
  })
}

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const cardList = document.querySelector('.list');

let numberOfCards;
let numbersArray = [];
let openCards = [];
let successCardsCount = 0;
let timerId;

const gameMode = document.querySelector('.game-mode');
gameMode.addEventListener('click', () => {
  if (gameMode.classList.contains('numbers')) {
    gameMode.classList.remove('numbers');
    gameMode.textContent = 'Картинки';
  } else {
    gameMode.classList.add('numbers');
    gameMode.textContent = 'Цифры';
  }
})


form.addEventListener('submit', (e) => {
  e.preventDefault();

  newGame();
  
  if (input.value < 2 || input.value > 10 || input.value % 2) {
    numberOfCards = 16;
  } else numberOfCards = input.value ** 2;

  createNumbersArray(numberOfCards);


  if (gameMode.classList.contains('numbers')) {
    numbersArray.forEach(value => {
      new Card(cardList, value, flip, numberOfCards ** .5);
    })
    input.value = '';
  } else {
    numbersArray.forEach(value => {
      new AmazingCard(cardList, value, flip, numberOfCards ** .5);
    })
    input.value = '';
  }
})