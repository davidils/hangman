let word = '';
let guess = '';
let numberOfGuesses = 0;
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

// TODO replace with hangman image transition
document.querySelector('.guessesNo').textContent = numberOfGuesses;

const popUpWindow = document.querySelector('.popUp');
const popUpWindowTitle = document.querySelector('.title');
const popUpWindowText = document.querySelector('.text');
const overlay = document.querySelector('.overlay');
const popUpImg = document.querySelector('.popUpImg');

const createWordToGuess = function () {
  for (let i = 0; i < word.length; i++) {
    guess += '_';
  }
  document.querySelector('.guess').textContent = guess;
};

const replaceUmlauts = function (str) {
  str = str.replace('ä', 'ae');
  str = str.replace('ö', 'oe');
  str = str.replace('ü', 'ue');
  str = str.replace('ß', 'ss');
  return str;
};

const fetchRandomWord = function () {
  fetch('https://random-word-api.herokuapp.com/word?lang=de')
    .then(response => response.json())
    .then(content => {
      word = content[0].toLowerCase();
      word = replaceUmlauts(word);
      word = word.toUpperCase();
      createWordToGuess();
    });
};

fetchRandomWord();

const guessLetter = function (letter) {
  document.querySelector(`#LETTER--${letter}`).disabled = true;

  if (word.includes(letter)) {
    for (let index = 0; index < word.length; index++) {
      if (word[index] === letter) {
        guess = guess.substring(0, index) + letter + guess.substring(index + 1);
      }
    }
    document.querySelector('.guess').textContent = guess;

    if (guess === word) {
      popUpWindow.classList.remove('hidden');
      overlay.classList.remove('hidden');
      popUpWindowTitle.textContent = 'Glückwunsch!';
      popUpWindowText.textContent = 'Du hast das Wort erraten!';
      popUpImg.src = 'img/won.jpg';
    }
  } else {
    numberOfGuesses++;
    document.querySelector('.guessesNo').textContent = numberOfGuesses;
    if (numberOfGuesses === 10) {
      popUpWindow.classList.remove('hidden');
      overlay.classList.remove('hidden');
      popUpWindowTitle.textContent = `Schade!`;
      popUpWindowText.textContent = `Das gesuchte Wort lautet: ${word}.`;
      popUpImg.src = 'img/lost.png';
    }
  }
};

for (let i = 0; i < alphabet.length; i++) {
  const letter = alphabet[i];
  const buttonElement = `<input type="button" class="btn--letter" id=LETTER--${letter} value=${letter} onclick="guessLetter('${letter}')"></input>`;
  document.querySelector('.letters').innerHTML += buttonElement;
}

function startNewGame() {
  word = '';
  guess = '';
  document
    .querySelectorAll('.btn--letter')
    .forEach(buttonElement => (buttonElement.disabled = false));
  numberOfGuesses = 0;
  document.querySelector('.guessesNo').textContent = numberOfGuesses;
  popUpWindow.classList.add('hidden');
  overlay.classList.add('hidden');

  fetchRandomWord();
}
