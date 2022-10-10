const QUOTE_API = "https://api.quotable.io/random";
const quoteDisplay = document.getElementById("typingText");
const quoteInput = document.getElementById("typingInput");
const timerElement = document.getElementById("timer");
let correct = true;

quoteInput.addEventListener("input", () => {
  const arrayQuote = quoteDisplay.querySelectorAll("span");
  const arrayInput = quoteInput.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayInput[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (characterSpan.innerText === character) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
      correct = true;
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });
  if (correct) {
    renderNewQuote();
  }
  console.log(correct);
});

const getRandomQuote = () => {
  return fetch(QUOTE_API)
    .then((response) => response.json())
    .then((data) => data.content);
};

const renderNewQuote = async () => {
  const quote = await getRandomQuote();
  quoteDisplay.innerText = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplay.appendChild(characterSpan);
  });
  quoteInput.value = null;
  count = 0 ;
  timer();
};
renderNewQuote();

let count = 0;
const timer = () => {
    timerElement.innerText = 0;
    count = new Date();
  setInterval(() => {
    timerElement.innerText = getNewTimer();
  }, 1000);
};

const getNewTimer = () => {
    return Math.floor((new Date() - count) /1000)
}