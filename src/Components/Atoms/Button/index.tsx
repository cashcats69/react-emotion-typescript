import styled from "@emotion/styled";
import { useContext } from "react";
import { iButton } from "../../../interfaces";
import { DragContext } from "../../../Context/DragContext";

export const ButtonSend: React.FC<iButton> = ({ handleClick }) => {
  const isDisabled = useContext(DragContext);
  const Button = styled("button")`
    margin: 0;
    padding: 0;
    border: 1px;
    height: 50px;
    width: 140px;
    border-radius: 10px;
    background: #5becc5;
    color: white;
    font-color: red;
    cursor: pointer;
    &:hover {
      background: #6deecf;
    }
    &:active {
      background: #1adba8;
    }
  `;
  return (
    <Button disabled={isDisabled} onClick={handleClick}>
      Check
    </Button>
  );
};
