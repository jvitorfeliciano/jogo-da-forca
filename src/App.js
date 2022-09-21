import palavras from "./palavras"
import React from "react"

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

const imgArchive= ['./assets/forca0.png','./assets/forca1.png','./assets/forca2.png','./assets/forca3.png','./assets/forca4.png','./assets/forca5.png','./assets/forca6.png'];

let number;
let wordVector;
let letterReceived;
let counterMistakes=0;

export default function App(){
    
    const [displayWord, setDisplayWord] = React.useState('');
    const [imgHanged, setImgHanged] = React.useState(imgArchive[counterMistakes]);

    function chooseWord(){
        number = Math.floor(Math.random()*palavras.length) ;
        wordVector = palavras[number].split('');
        setDisplayWord(wordVector.map((p) => ' _'));
        console.log(wordVector)    
    }
    
    function getLetter(e){
        // condição para resolver o bug da imagem sumir, quando contador de erro for igual a 6 a função retorna e nada mais é executado dentro dela;
        if(counterMistakes >= 6){ 
            return
        }
        letterReceived = e.target.value

        if (wordVector!==undefined){
            if(wordVector.includes(letterReceived)){
                alert('Simboraaaa')
            }
            else{
                counterMistakes++
                setImgHanged(imgArchive[counterMistakes])
            }   
        }           
    }
    return(
        <main>
            <section className='hangman'>
                <figure>
                    <img src={imgHanged}/>
                </figure>
                <button type='button' onClick={chooseWord}>
                    Escolher Palavra
                </button>
                <div className='word'>
                  {displayWord}
                </div>  
            </section>
            <section className='keyboard'>
                {alfabeto.map((k,index) => <button key={index}type="button" value={k} onClick={(e)=> getLetter(e)} >
                {k.toUpperCase()}
                    </button>)}
            </section>
            <section className="guesswork">
                <form>
                    <label>Já sei a palavra!</label>
                    <input type="text"/>
                    <button type="button">
                        Chutar
                    </button>
                </form>
            </section>
        </main>
    )
}

