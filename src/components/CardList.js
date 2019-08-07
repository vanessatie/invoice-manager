import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";

function CardList({ cards, onCardClick }) {
  const [month, setMonth] = React.useState(defaultMonth());
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

  function defaultMonth() {
    let today = new Date();
    let currentMonth = today.getMonth() + 1;

    return currentMonth;
  }
  function filterMonth(element) {
    if (month < 10) {
      return element.date.includes("-0" + month + "-");
    }
    if (month < 9) {
      return element.date.includes("-" + month + "-");
    }
  }

  function handleMonthChange(event) {
    setMonth(event.target.value);
  }

  return (
    <>
      <select name="month" onChange={event => handleMonthChange(event)}>
        <option value="">Select</option>
        <option value="1">Januar</option>
        <option value="2">Februar</option>
        <option value="3">März</option>
        <option value="4">April</option>
        <option value="5">Mai</option>
        <option value="6">Juni</option>
        <option value="7">Juli</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">Oktober</option>
        <option value="11">November</option>
        <option value="12">Dezember</option>
      </select>

      {month === ""
        ? cards
            .slice()
            .sort(sortDate)
            .map(renderCard)
        : cards
            .filter(filterMonth)
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
