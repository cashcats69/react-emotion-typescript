import styled from "@emotion/styled";
import { eDictionary, iArea } from "../../../interfaces";
import { DragStoreContainer } from "../../Molecules/DragStoreContainer";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { memo } from "react";
const ContainerArea = styled("div")`
  display: block;
  min-width: 300px;
  width: 800px;
  margin: 0 auto;
  @media (max-width: 1000px) {
    width: 90%;
  }
`;

export const DragAndDropArea: React.FC<iArea> = memo(
  ({ setCard, setECard, items, items2 }) => {
    const lists = ["droppable-1", "droppable-2"];
    const removeFromList = (
      list: eDictionary[],
      index: number
    ): [removed: eDictionary, result: eDictionary[]] => {
      const result = list;
      const [removed] = result.splice(index, 1);
      return [removed, result];
    };
    const addToList = (
      list: eDictionary[],
      index: number,
      element: eDictionary
    ) => {
      const result = Array.from(list);
      result.splice(index, 0, element);
      return result;
    };
    function reSort(currentList: eDictionary[]) {
      setCard(currentList.sort((prev, next) => prev.id - next.id));
    }
    function onDragEnd(result: DropResult) {
      if (!result.destination) {
        return;
      }
      if (result.destination.droppableId === result.source.droppableId) {
        if (result.destination.droppableId === "droppable-1") {
          const cardList = [...items];
          const [removed] = cardList.splice(result.source.index, 1);
          cardList.splice(result.destination.index, 0, removed);
          setCard(cardList);
          reSort(cardList);
          return;
        } else {
          const cardList = [...items2];
          const [removed] = cardList.splice(result.source.index, 1);
          cardList.splice(result.destination.index, 0, removed);
          setECard(cardList);
          return;
        }
      }
      let sourceList: eDictionary[] = [];
      let destinationList: eDictionary[] = [];

      if (result.source.droppableId === "droppable-1") {
        sourceList = [...items];
      } else {
        sourceList = [...items2];
      }
      if (result.destination.droppableId === "droppable-1") {
        destinationList = [...items];
      } else {
        destinationList = [...items2];
      }
      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );

      sourceList = newSourceList;
      const listCopy = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
      if (
        result.source.droppableId === "droppable-1" &&
        result.destination.droppableId === "droppable-2"
      ) {
        setCard(newSourceList);
        setECard(listCopy);
      } else {
        setCard(listCopy);
        setECard(newSourceList);
        reSort(listCopy);
      }
    }
    return (
      <ContainerArea>
        <DragDropContext onDragEnd={onDragEnd}>
          <DragStoreContainer droppableId={lists[1]} items={items2} />
          <DragStoreContainer droppableId={lists[0]} items={items} />
        </DragDropContext>
      </ContainerArea>
    );
  }
);
