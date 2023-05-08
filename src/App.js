import { useEffect, useState } from "react";
import car from "./assists/car.png";
import jet from "./assists/jet.png";
import bike from "./assists/bicycle.png";
import motorcycle from "./assists/motorcycle.png";
import "./App.css";
import Card from "./components/card/Card";
const constants = [
  { item: car, matched: false },
  { item: jet, matched: false },
  { item: bike, matched: false },
  { item: motorcycle, matched: false },
];
const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disable, setDisable] = useState(false);
  const [finish, setFinish] = useState(false);

  const shuffleCardsHandler = () => {
    const shuffle = [...constants, ...constants]
      .sort(() => Math.random() - 0.5)
      .map((items) => ({ ...items, id: Math.random() }));

    setCards(shuffle);
    setTurns(0);
    setFirst(null);
    setSecond(null);
  };
  const selectHandler = (item) => {
    first ? setSecond(item) : setFirst(item);
  };
  const reset = () => {
    setFirst(null);
    setSecond(null);
    setTurns((prev) => prev + 1);
    setDisable(false);
  };

  useEffect(() => {
    if (first && second) {
      setDisable(true);
      if (first.item === second.item && first.id !== second.id) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.item === first.item) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else {
        setTimeout(() => reset(), 700);
      }
    }
  }, [first, second]);
  useEffect(() => {
    const resultsCheck = cards.every((item) => item.matched === true);
    resultsCheck ? setFinish(true) : setFinish(false);
  });
  useEffect(() => {
    shuffleCardsHandler();
  }, []);
  const startGameBtn = cards.length > 0 ? "Reset" : "Start";

  return (
    <div className="container">
      <h1>Select Matching Images</h1>
      <button
        onClick={shuffleCardsHandler}
        className={`btn ${finish ? "finished" : ""}`}
      >
        {finish ? "Won" : startGameBtn}
      </button>
      <p>Turns: {turns}</p>

      <div className="card-container">
        {cards.map((card) => (
          <Card
            card={card}
            selectHandler={selectHandler}
            key={card.id}
            flipped={card === first || card === second || card.matched}
            disable={disable}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
