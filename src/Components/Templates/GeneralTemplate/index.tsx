import { useEffect, useState } from "react";
import { eDictionary, iCards, iData } from "../../../interfaces";
import { ButtonSend } from "../../Atoms/Button";
import { DragAndDropArea } from "../../Organisms/DragAndDropArea";
import { HeaderExercise } from "../../Molecules/HeaderExercise";
import { CardsContext } from "../../../Context/CardsContext";
import { DragContext } from "../../../Context/DragContext";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

async function getData(
  setLoaded: React.Dispatch<React.SetStateAction<boolean>>
) {
  const response = await fetch(
    "https://academtest.ilink.dev/graphql?query={sentenceAll{en,ru}}"
  );
  if (response.ok) {
    let json = await response.json();
    console.log("ok");
    setTimeout(() => setLoaded(true), 2000);

    return json.data.sentenceAll;
  } else {
    console.log("Ошибка HTTP: " + response.status);
    getData(setLoaded);
  }
}

export const GeneralTemplate: React.FC = () => {
  const [dragState, setDragState] = useState(false);
  const [counter, setCounter] = useState(0);
  const [cards, setCards] = useState<iCards[]>();
  const [card, setCard] = useState<eDictionary[]>([]);
  const [eCard, setECard] = useState<eDictionary[]>([]);
  const [sentence, setSentence] = useState("");
  const [sentenceAll, setSentenceAll] = useState<iData[]>();
  const [isVisible, setIsVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getData(setLoaded).then((json) => dataToCards(json));
  }, []);

  const showLoader = keyframes`
0%{
  transform:rotate(0deg);
}
100%{
  transform:rotate(360deg);
}
`;
  const Cirle = styled("div")`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: dashed white;
    animation: ${showLoader} 1s infinite;
  `;
  function dataToCards(data: iData[]) {
    const sortedData = data.map((item) => {
      return { en: item.en.split(" "), ru: item.ru };
    });
    const dataCards = sortedData.map((data) => {
      let i = 0;
      return {
        en: data.en.map((word) => {
          i++;
          return { id: i, word: word };
        }),
        ru: data.ru,
      };
    });
    setCards({ ...dataCards });
    setCard([...dataCards[0].en]);
    setSentence(data[0].ru);
    setSentenceAll(data);
  }

  const changeCard = () => {
    const copyE = eCard
      .map((card) => {
        return card.word;
      })
      .join(" ");
    if (sentenceAll && cards && Object.keys(cards).length > counter) {
      if (copyE === sentenceAll[counter].en) {
        let utterance = new SpeechSynthesisUtterance(copyE);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
        setDragState(true);
        setIsVisible(true);
        setTimeout(() => {
          setCounter(counter + 1);
          if (cards[counter + 1] !== undefined) {
            setCard([...cards[counter + 1].en]);
            setSentence(sentenceAll[counter + 1].ru);
            setECard([]);
          } else {
            setSentence("Задание выполнено успешно!");
            setCard([]);
            setECard([]);
          }
          setDragState(false);
          setIsVisible(false);
        }, 4000);
      } else {
        setIsVisible(true);
      }
    }
  };
  return (
    <>
      {!loaded ? (
        <Cirle />
      ) : (
        <CardsContext.Provider value={sentence}>
          <DragContext.Provider value={dragState}>
            <HeaderExercise isVisible={isVisible} />
            <DragAndDropArea
              items={card}
              items2={eCard}
              setCard={setCard}
              setECard={setECard}
            />
            <ButtonSend handleClick={changeCard} />
          </DragContext.Provider>
        </CardsContext.Provider>
      )}
    </>
  );
};
