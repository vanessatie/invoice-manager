import React from "react";
import PropTypes from "prop-types";
import Header from "../components/Header";
import CardList from "../components/CardList";
import { SumCalculation, TaxCalculation } from "../components/Calculation";
import BackgroundImg from "../components/BackgroundImage";

function defaultMonth() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  return currentMonth;
}

function Cards({ cards, history }) {
  const [month, setMonth] = React.useState(defaultMonth());

  function handleCardClick(card) {
    history.push(`/detail/${card._id}`);
  }

  function filterMonth(element) {
    if (month < 10 && month > 0) {
      const singleMonth = element.date.includes("-0" + month + "-");
      return singleMonth;
    } else {
      return element.date.includes("-" + month + "-");
    }
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  const filteredCards = month === "0" ? cards : cards.filter(filterMonth);

  return (
    <>
      <Header title="Rechnungen" headerIcon={<i className="fas fa-list" />} />
      <BackgroundImg src="background_img.png" />
      <CardList
        month={month}
        cards={filteredCards}
        onCardClick={handleCardClick}
        onMonthSelect={handleMonthChange}
      />
      <TaxCalculation cards={filteredCards} />
      <SumCalculation cards={filteredCards} />
    </>
  );
}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object
};

export default Cards;
