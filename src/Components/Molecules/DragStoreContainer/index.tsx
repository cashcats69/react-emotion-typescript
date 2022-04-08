import styled from "@emotion/styled";
import { memo } from "react";
import { Droppable } from "react-beautiful-dnd";
import { iDragStore } from "../../../interfaces";
import { DragElem } from "../../Atoms/DragElem";
const DivDragStore = styled("div")`
display:flex;
flex-wrap:no-wrap;
align-content: space-around;
justify-content:space-evenly;
background-color: #B2CAFA;
margin-left: 18px;
margin-right: 18px;
white-space: normal;
border-radius:15px;
min-width:200px;
min-height:70px;
margin-bottom:30px;
overflow:hidden;
@media (max-width: 1000px) {
  width: 100%;
  margin-left: 0;
  margin-right: 0;

}
&:after {
  content: "";
  clear: both;
  display: table;
`;

export const DragStoreContainer: React.FC<iDragStore> = memo(
  ({ droppableId, items }) => {
    return (
      <Droppable direction="horizontal" droppableId={droppableId}>
        {(provided, snapshot) => {
          return (
            <DivDragStore {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => {
                return (
                  <DragElem
                    text={item.word}
                    dragId={item.id.toString()}
                    index={index}
                    key={item.id}
                  />
                );
              })}
              {provided.placeholder}
            </DivDragStore>
          );
        }}
      </Droppable>
    );
  }
);
