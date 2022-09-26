import styled from "styled-components";

export default function Guess(props){

    return(
        <Guesswork>
        <label>Já sei a palavra!</label>
        <input
          disabled={props.inputstate ? true : false}
          onChange={(event) => props.setGuessedWord(event.target.value)}
          value={props.guessedWord}
          type="text"
          data-identifier="type-guess"
        />
        <button
          onClick={props.validateInput}
          type="button"
          data-identifier="guess-button"
        >
          Chutar
        </button>
      </Guesswork>
    )
}

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
