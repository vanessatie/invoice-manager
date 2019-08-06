import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

function CardList({ cards, onCardClick }) {
  function renderCard(card) {
    return <Card key={card._id} {...card} onClick={() => onCardClick(card)} />;
  }

  function sortDate(a, b) {
    if (a.date < b.date) {
      return 1;
    }

    if (a.date > b.date) {
      return -1;
    }

    return 0;
  }

  return (
    <>
      {cards
        .slice()
        .sort(sortDate)
        .map(renderCard)}
    </>
  );
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired
};

export default CardList;
