import styled from "styled-components";

export default function Game(props) {
  return (
    <Hangman>
      <figure>
        <img data-identifier="game-image" src={props.imgHanged} />
      </figure>
      <ChooseWordButton
        type="button"
        onClick={props.chooseWord}
        data-identifier="choose-word"
      >
        Escolher Palavra
      </ChooseWordButton>
      <DisplayedWord color={props.colorState} data-identifier="word">
        {props.displayWord}
      </DisplayedWord>
    </Hangman>
  );
}
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
  letter-spacing: ${(props) => (props.color === "black" ? "8px" : "2px")};
  color: ${(props) => props.color};
`;
