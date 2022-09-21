import palavras from "./palavras"

const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function Keyboard(props){
    return(
        <button type="button" value={props.value}>
            {props.value.toUpperCase()}
        </button>
    )
}

export default function App(){
    return(
        <main>
            <section className='hangman'>
                <figure>
                    <img src='./assets/forca0.png'/>
                </figure>
                <button type='button'>
                    Escolher Palavra
                </button>
                <div className='word'>
                   Aqui vai a palavra
                </div>  
            </section>
            <section className='keyboard'>
                {alfabeto.map((k,index) =><Keyboard key={index} value={k}/>)}
            </section>
            <section className="guesswork">
                <form>
                    <label>Já sei a palavra!</label>
                    <input type="text"/>
                    <button>
                        Chutar
                    </button>
                </form>
            </section>
        </main>
    )
}