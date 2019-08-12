import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import CardList from "../components/CardList";
import { SumCalculation, TaxCalculation } from "../components/Calculation";

function Cards({ cards, history }) {
  function handleCardClick(card) {
    history.push(`/detail/${card._id}`);
  }

  return (
    <>
      <Header title="Rechnungen" />
      <CardList cards={cards} onCardClick={handleCardClick} />
      <TaxCalculation cards={cards} />
      <SumCalculation cards={cards} />
    </>
  );
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Cards;
