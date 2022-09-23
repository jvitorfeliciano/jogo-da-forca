import palavras from "./palavras";
import {useState} from "react";
import alfabeto from "./alfabeto";

const imgArchive = [
  "./assets/forca0.png",
  "./assets/forca1.png",
  "./assets/forca2.png",
  "./assets/forca3.png",
  "./assets/forca4.png",
  "./assets/forca5.png",
  "./assets/forca6.png",
];
const adressArchive = alfabeto.map((letter,index)=>index)
let randomNumber, wordVector, letterReceived, assistent, adress;
let counterMistakes = 0;

export default function App() {
  const [displayWord, setDisplayWord] = useState("");
  const [imgHanged, setImgHanged] = useState(imgArchive[counterMistakes]);
  const [colorState, setColorState] = useState("word");
  const [guessedWord, setGuessedWord]=useState("")
  const [vectorAdress, setVectorAdress] =useState([...adressArchive])
  const [inputstate, setInputState] = useState(true)
  
  function enableButtonAndInput(){
    setVectorAdress([])
    setInputState(false)
  }

  function resetGame() {
    assistent = undefined;
    wordVector = undefined;
    counterMistakes = 0;
    setImgHanged([imgArchive[counterMistakes]]);
    setColorState("word");
  }

  function removeSpecials(text) {
    text = text.replace(/[àáâã]/, "a");
    text = text.replace(/[ôóòõ]/, "o");
    text = text.replace(/[êéèẽ]/, "e");
    text = text.replace(/[ûúùũ]/, "u");
    text = text.replace(/[îíìĩ]/, "i");
    text = text.replace(/[ç]/, "c");
    return text.replace(/[^a-z0-9]/gi, "");
  }

  function chooseWord() {
    if (wordVector !== undefined) {
      resetGame();
    }
    enableButtonAndInput()
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
      setVectorAdress([...adressArchive])
      setInputState(true)
    }
  }

  function updateImg() {
    counterMistakes++;
    setImgHanged(imgArchive[counterMistakes]);

    if (counterMistakes === 6) {
      setDisplayWord([...wordVector]);
      setColorState("wentWrong");
      setVectorAdress([...adressArchive])
      setInputState(true)
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
    if (wordVector===undefined || counterMistakes === 6 || assistent.join("") === wordVector.join("")) {
      return;
    }

    adress = Number(e.target.id)
    setVectorAdress([...vectorAdress,adress])
    console.log(adress)
    letterReceived = e.target.value;
    if (wordVector !== undefined) {
      validateChosenLetter();
    }
  }
  
 function validateInput() {
      if(guessedWord===""){  // impedir de usar o input quando este estiver desabalitado
        return
      }
      if(guessedWord.split(' ').join('')=== wordVector.join("")){
        setColorState("wentRight");
        setDisplayWord(wordVector)
        setGuessedWord('')
        setVectorAdress([...adressArchive])
        setInputState(true)
      } 
      else {
        counterMistakes=6
        setColorState("wentWrong")
        setImgHanged(imgArchive[counterMistakes])
        setGuessedWord('')
        setDisplayWord(wordVector)
        setVectorAdress([...adressArchive])
        setInputState(true)
      }
     
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
            disabled ={vectorAdress.includes(index)? true:false}
            className={vectorAdress.includes(index)? "disabled":"enabled"}
            key={index}
            id={index}
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
          <input disabled={inputstate ? true: false} onChange={(event)=>setGuessedWord(event.target.value)} value={guessedWord}type="text" />
          <button onClick={validateInput} type="button">Chutar</button>
        </form>
      </section>
    </main>
  );
}
