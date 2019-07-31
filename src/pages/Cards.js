import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Card from "../components/Card";

function Cards({ cards }) {
  console.log(cards);
  return (
    <>
      <Header title="Your Invoices" />
      <Card cardData={cards} />
    </>
  );
}

Cards.propTypes = {
  cards: PropTypes.array
};

export default Cards;
