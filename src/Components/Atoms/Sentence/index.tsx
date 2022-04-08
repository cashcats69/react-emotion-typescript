import { memo, useContext } from "react";
import { CardsContext } from "../../../Context/CardsContext";
export const Sentence: React.FC = memo(() => {
  const sentence = useContext(CardsContext);
  return <h1>{sentence}</h1>;
});
