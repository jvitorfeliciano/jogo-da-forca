import { useState } from "react";
import styled from "styled-components";
import GloboStyle from "./Golobostyle";
import Guess from "./Chute";
import Game from "./Jogo";
import Word from "./Letras";
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
  const [colorState, setColorState] = useState("black");
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
    setColorState("black");
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
      <Game imgHanged={imgHanged} chooseWord={chooseWord} colorState={colorState} displayWord={displayWord}/>
      <Word alfabeto={alfabeto} vectorAdress={vectorAdress} getLetter={getLetter}/>
      <Guess inputstate= {inputstate} setGuessedWord={setGuessedWord} guessedWord={guessedWord} validateInput={validateInput}/>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;
