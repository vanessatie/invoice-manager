import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import CardList from "../components/CardList";

function Cards({ cards, history }) {
  function handleCardClick(card) {
    history.push(`/detail/${card._id}`);
  }

  return (
    <>
      <Header title="Your Invoices" />
      <CardList cards={cards} onCardClick={handleCardClick} />
    </>
  );
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Cards;
