import palavras from "./palavras";
import React from "react";

const alfabeto = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const imgArchive = [
  "./assets/forca0.png",
  "./assets/forca1.png",
  "./assets/forca2.png",
  "./assets/forca3.png",
  "./assets/forca4.png",
  "./assets/forca5.png",
  "./assets/forca6.png",
];

let randomNumber, wordVector, letterReceived, assistent;
let counterMistakes = 0;

export default function App() {
  const [displayWord, setDisplayWord] = React.useState("");
  const [imgHanged, setImgHanged] = React.useState(imgArchive[counterMistakes]);
  const [colorState, setColorState] = React.useState("word");

  function resetGame() {
    assistent = undefined;
    wordVector = undefined;
    counterMistakes = 0;
    setImgHanged([imgArchive[counterMistakes]]);
    setColorState("word");
  }

  function chooseWord() {
    if (wordVector !== undefined) {
      resetGame();
    }

    randomNumber = Math.floor(Math.random() * palavras.length);
    wordVector = palavras[randomNumber].split("");
    assistent = wordVector.map((p) => " _");
    setDisplayWord(assistent);

    console.log(wordVector);
  }

  function setRightWord() {
    for (let i = 0; i < removeSpecials(wordVector.join("")).length; i++) {
      if (removeSpecials(wordVector.join(""))[i] === letterReceived) {
        assistent.splice(i, 1, wordVector.join("")[i]);
      }
    }
    setDisplayWord([...assistent]);
    if (assistent.join("") === wordVector.join("")) {
      setColorState("wentRight");
    }
  }

  function updateImg() {
    counterMistakes++;
    setImgHanged(imgArchive[counterMistakes]);

    if (counterMistakes === 6) {
      setDisplayWord([...wordVector]);
      setColorState("wentWrong");
    }
  }
  function validateChosenLetter() {
    if (removeSpecials(wordVector.join("")).includes(letterReceived)) {
      setRightWord();
    } else {
      updateImg();
    }
  }
  function getLetter(e) {
    // condição para resolver o bug da imagem sumir, quando contador de erro for igual a 6 a função retorna e nada mais é executado dentro dela;
    if (counterMistakes === 6 || assistent.join("") === wordVector.join("")) {
      return;
    }

    letterReceived = e.target.value;
    if (wordVector !== undefined) {
      validateChosenLetter();
    }
  }
  function removeSpecials(text) {
    text = text.replace(/[àáâãäå]/, "a");
    text = text.replace(/[ôóò]/, "o");
    text = text.replace(/[ûúù]/, "u");
    text = text.replace(/[îíì]/, "i");
    text = text.replace(/[ç]/, "c");
    return text.replace(/[^a-z0-9]/gi, "");
  }

  return (
    <main>
      <section className="hangman">
        <figure>
          <img src={imgHanged} />
        </figure>
        <button type="button" onClick={chooseWord}>
          Escolher Palavra
        </button>
        <div className={colorState}>{displayWord}</div>
      </section>
      <section className="keyboard">
        {alfabeto.map((k, index) => (
          <button
            key={index}
            type="button"
            value={k}
            onClick={(e) => getLetter(e)}
          >
            {k.toUpperCase()}
          </button>
        ))}
      </section>
      <section className="guesswork">
        <form>
          <label>Já sei a palavra!</label>
          <input type="text" />
          <button type="button">Chutar</button>
        </form>
      </section>
    </main>
  );
}
