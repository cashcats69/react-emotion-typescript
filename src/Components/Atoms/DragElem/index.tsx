import styled from "@emotion/styled";
import { memo, useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { iDragElem } from "../../../interfaces";
import { DragContext } from "../../../Context/DragContext";
const StyledItem = styled("div")`
  float: left;
  text-align: center;
  width: 10%;
  cursor: grab;
  background-color: rbga(255, 255, 255, 0.75);
  border-radius: 15px;
`;
export const DragElem: React.FC<iDragElem> = memo(({ text, dragId, index }) => {
  const isDrag = useContext(DragContext);
  return (
    <Draggable
      key={index}
      draggableId={dragId}
      index={index}
      isDragDisabled={isDrag}
    >
      {(provided, snapshot) => (
        <StyledItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p> {text}</p>
        </StyledItem>
      )}
    </Draggable>
  );
});
