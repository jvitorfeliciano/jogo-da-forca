import { useState } from "react";
import styled from "styled-components";
import GloboStyle from "./Golobostyle";
import palavras from "./palavras";
import alfabeto from "./alfabeto";
import hangman0 from "./assets/forca0.png";
import hangman1 from "./assets/forca1.png";
import hangman2 from "./assets/forca2.png";
import hangman3 from "./assets/forca3.png";
import hangman4 from "./assets/forca4.png";
import hangman5 from "./assets/forca5.png";
import hangman6 from "./assets/forca6.png";

const imgArchive = [
  hangman0,
  hangman1,
  hangman2,
  hangman3,
  hangman4,
  hangman5,
  hangman6,
];

let wordVector = [];
let assistentWordVector = [];
let randomNumber, letterReceived, letterAdress;
let counterMistakes = 0;
const adressArchive = alfabeto.map((letter, index) => index);

export default function App() {
  const [displayWord, setDisplayWord] = useState("");
  const [imgHanged, setImgHanged] = useState(imgArchive[counterMistakes]);
  const [colorState, setColorState] = useState("word");
  const [guessedWord, setGuessedWord] = useState("");
  const [vectorAdress, setVectorAdress] = useState([...adressArchive]);
  const [inputstate, setInputState] = useState(true);

  function enableButtonAndInput() {
    setVectorAdress([]);
    setInputState(false);
  }

  function resetGame() {
    assistentWordVector = [];
    wordVector = [];
    randomNumber = undefined;
    letterReceived = undefined;
    letterAdress = undefined;
    counterMistakes = 0;
    setImgHanged([imgArchive[counterMistakes]]);
    setColorState("word");
    setGuessedWord("");
  }

  function removeSpecials(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function chooseWord() {
    if (wordVector !== undefined) {
      resetGame();
    }
    enableButtonAndInput();
    randomNumber = Math.floor(Math.random() * palavras.length);
    wordVector = palavras[randomNumber].split("");
    assistentWordVector = wordVector.map((p) => "_");
    setDisplayWord(assistentWordVector);

    console.log(wordVector);
  }

  function setRightWord() {
    for (let i = 0; i < removeSpecials(wordVector.join("")).length; i++) {
      if (removeSpecials(wordVector.join(""))[i] === letterReceived) {
        assistentWordVector.splice(i, 1, wordVector.join("")[i]);
      }
    }
    setDisplayWord([...assistentWordVector]);
    if (assistentWordVector.join("") === wordVector.join("")) {
      setColorState("#2aae60");
      setVectorAdress([...adressArchive]);
      setInputState(true);
    }
  }

  function updateImg() {
    counterMistakes++;
    setImgHanged(imgArchive[counterMistakes]);

    if (counterMistakes === 6) {
      setDisplayWord([...wordVector]);
      setColorState("red");
      setVectorAdress([...adressArchive]);
      setInputState(true);
    }
  }
  function validateChosenLetter() {
    if (removeSpecials(wordVector.join("")).includes(letterReceived)) {
      console.log(removeSpecials(wordVector.join("")));
      setRightWord();
    } else {
      updateImg();
    }
  }
  function getLetter(e) {
    letterAdress = Number(e.target.id);
    letterReceived = e.target.value;
    setVectorAdress([...vectorAdress, letterAdress]);
    console.log(letterAdress);
    if (wordVector !== undefined) {
      validateChosenLetter();
    }
  }

  function validateInput() {
    if (guessedWord.split(" ").join("") === "") {
      // impedir de usar o input quando este estiver desabalitado ou a letra digita for uma string vazia
      alert("Preencha o campo corretamente!");
      return;
    }
    if (
      removeSpecials(guessedWord.toLowerCase().split(" ").join("")) ===
      removeSpecials(wordVector.join(""))
    ) {
      setColorState("#2aae60");
      setDisplayWord(wordVector);
      setGuessedWord("");
      setVectorAdress([...adressArchive]);
      setInputState(true);
    } else {
      counterMistakes = 6;
      setColorState("red");
      setImgHanged(imgArchive[counterMistakes]);
      setGuessedWord("");
      setDisplayWord(wordVector);
      setVectorAdress([...adressArchive]);
      setInputState(true);
    }
  }

  return (
    <Main>
      <GloboStyle />
      <Hangman>
        <figure>
          <img data-identifier="game-image" src={imgHanged} />
        </figure>
        <ChooseWordButton
          type="button"
          onClick={chooseWord}
          data-identifier="choose-word"
        >
          Escolher Palavra
        </ChooseWordButton>
        <DisplayedWord color={colorState} data-identifier="word">
          {displayWord}
        </DisplayedWord>
      </Hangman>
      <Keyboard>
        {alfabeto.map((k, index) => (
          <KeyboardButton
            disabled={vectorAdress.includes(index) ? true : false}
            condition={vectorAdress.includes(index)}
            key={index}
            id={index}
            type="button"
            value={k}
            onClick={(e) => getLetter(e)}
            data-identifier="letter"
          >
            {k.toUpperCase()}
          </KeyboardButton>
        ))}
      </Keyboard>
      <Guesswork>
        <label>Já sei a palavra!</label>
        <input
          disabled={inputstate ? true : false}
          onChange={(event) => setGuessedWord(event.target.value)}
          value={guessedWord}
          type="text"
          data-identifier="type-guess"
        />
        <button
          onClick={validateInput}
          type="button"
          data-identifier="guess-button"
        >
          Chutar
        </button>
      </Guesswork>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
const Hangman = styled.section`
  width: 745px;
  height: 476px;
  position: relative;
  background-color: rgb(255, 255, 255);

  figure {
    width: 400px;
    height: 476px;
    img {
      width: 100%;
      height: auto;
    }
  }
`;

const ChooseWordButton = styled.button`
  width: 170px;
  height: 50px;
  color: white;
  background-color: rgb(42, 174, 96);
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 40px;
`;
const DisplayedWord = styled.div`
  position: absolute;
  bottom: 30px;
  right: 40px;
  font-size: 40px;
  font-weight: bold;
  letter-spacing: 8px;
  color: ${(props) => props.color};
`;
const Keyboard = styled.section`
  width: 660px;
  height: 110px;
  margin-top: 55px;
  background-color: rgb(255, 255, 255);
`;

const KeyboardButton = styled.button`
  width: 40px;
  height: 40px;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 3px;
  border: ${(props) =>
    props.condition === true ? "none" : "1px solid #39739e"};
  color: ${(props) => (props.condition === true ? "#83878e" : "#39739e")};
  background-color: ${(props) => (props.condition ? "#9faab5" : "e1ecf6")};
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    filter: brightness(110%);
  }
`;

const Guesswork = styled.section`
  margin-top: 32px;
  label {
    font-size: 20px;
  }
  input {
    width: 325px;
    height: 35px;
    border: 2px solid black;
    border-radius: 3px;
    margin-left: 15px;
    font-size: 20px;
    padding-left: 10px;
    &:focus {
      outline: 3px solid rgb(57, 115, 157);
      border: none;
      letter-spacing: 1px;
    }
  }

  button {
    width: 75px;
    height: 40px;
    margin-left: 18px;
    border-radius: 5px;
    border: 1px solid rgb(57, 115, 157);
    color: rgb(57, 115, 157);
    background-color: rgb(225, 236, 245);
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    &:hover {
      filter: brightness(110%);
    }
  }
`;
