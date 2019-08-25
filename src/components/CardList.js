import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Card from "./Card";

const StyledCardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button`
  align-self: center;
  border-radius: 15px;
  margin: 20px 10px 10px 10px;
  padding: 7px 20px 7px 20px;
  height: auto;
  width: auto;
  background-color: white;
  font-weight: bold;
  border: 1px solid #bfc0c0;
  box-shadow: 2px 2px 0px #bfc0c0;
`;

const StyledMonthSelect = styled.select`
  text-align: center;
  text-align-last: center;
  font-weight: bold;
  font-size: 0.9rem;
`;

function CardList({ cards, onCardClick, month, onMonthSelect }) {
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
    <StyledCardList>
      <StyledButton>
        <StyledMonthSelect
          name="month"
          value={month}
          onChange={event => onMonthSelect(event)}
        >
          <option value="0">Gesamt</option>
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
        </StyledMonthSelect>
        <i className="fas fa-chevron-down" />
      </StyledButton>

      {cards
        .slice()
        .sort(sortDate)
        .map(renderCard)}
    </StyledCardList>
  );
}

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onMonthSelect: PropTypes.func
};

export default CardList;
