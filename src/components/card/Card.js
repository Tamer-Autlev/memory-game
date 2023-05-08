import "./card.css";
import quesitonMark from "../../assists/question-mark-icon-41636.png";
const Card = ({ card, selectHandler, flipped, disable }) => {
  const selectClickHandler = () => {
    if (!disable) {
      selectHandler(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.item} alt="..." />
        <img
          className="back"
          src={quesitonMark}
          alt="..."
          onClick={selectClickHandler}
        />
      </div>
    </div>
  );
};

export default Card;
