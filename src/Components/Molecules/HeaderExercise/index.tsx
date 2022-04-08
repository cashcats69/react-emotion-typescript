import { memo, useContext } from "react";
import { iHeader } from "../../../interfaces";
import { Sentence } from "../../Atoms/Sentence";
import { DragContext } from "../../../Context/DragContext";
function correctAlert(correct: boolean, isVisible: boolean) {
  if (isVisible) {
    if (correct) {
      return <h3>Успешно!</h3>;
    } else {
      return <h3>Попробуйте еще раз!</h3>;
    }
  }
}
export const HeaderExercise: React.FC<iHeader> = memo(({ isVisible }) => {
  const correct = useContext(DragContext);
  return (
    <div>
      <Sentence />
      {correctAlert(correct, isVisible)}
    </div>
  );
});
