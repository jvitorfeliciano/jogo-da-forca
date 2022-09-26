import styled from "styled-components";

export default function Word(props) {
  return (
    <Keyboard>
      {props.alfabeto.map((k, index) => (
        <KeyboardButton
          disabled={props.vectorAdress.includes(index) ? true : false}
          condition={props.vectorAdress.includes(index)}
          key={index}
          id={index}
          type="button"
          value={k}
          onClick={(e) => props.getLetter(e)}
          data-identifier="letter"
        >
          {k.toUpperCase()}
        </KeyboardButton>
      ))}
    </Keyboard>
  );
}

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
  background-color: ${(props) =>
    props.condition === true ? "#9faab5" : "e1ecf6"};
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    filter: brightness(110%);
  }
`;


