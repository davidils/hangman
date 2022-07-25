let word = '';
let guess = '';
let numberOfGuesses = 0;

document.querySelector('.guessesNo').textContent = numberOfGuesses;

const buildWord = function () {
  for (let i = 0; i < word.length; i++) {
    guess += '_';
  }
  console.log(guess);
  document.querySelector('.guess').textContent = guess;
};

const fetchRandomWord = function () {
  fetch('https://random-word-api.herokuapp.com/word?lang=de')
    .then(response => response.json())
    .then(content => {
      word = content[0].toLowerCase();
      word = word.replace('ä', 'ae');
      word = word.replace('ö', 'oe');
      word = word.replace('ü', 'ue');
      word = word.replace('ß', 'ss');
      word = word.toUpperCase();
      buildWord();
    });
};
fetchRandomWord();

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
      alert('You guessed the word!');
    }
  } else {
    numberOfGuesses++;
    document.querySelector('.guessesNo').textContent = numberOfGuesses;
    console.log(`There is no ${letter} in this word!`);
    if (numberOfGuesses === 10) {
      alert(`You did not guess ${word}!`);
    }
  }
};

for (let i = 0; i < alphabet.length; i++) {
  const letter = alphabet[i];
  const buttonElement = `<input type="button" class="btn--letter" id=LETTER--${letter} value=${letter} onclick="guessLetter('${letter}')"></input>`;
  document.querySelector('.letters').innerHTML += buttonElement;
}
