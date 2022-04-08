export interface iData {
  ru: string;
  en: string;
}
export type eDictionary = {
  id: number;
  word: string;
};
export interface iCards {
  en: eDictionary[];
  ru: string;
}
export interface iButton {
  handleClick: () => void;
}
export interface iDragElem {
  text: string;
  dragId: string;
  index: number;
}
export interface iArea {
  setCard: React.Dispatch<React.SetStateAction<eDictionary[]>>;
  setECard: React.Dispatch<React.SetStateAction<eDictionary[]>>;
  items: eDictionary[];
  items2: eDictionary[];
}
export interface iDragStore {
  droppableId: string;
  items: eDictionary[];
}
export interface iHeader {
  isVisible: boolean;
}
