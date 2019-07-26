import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  line-height: 1.5;
  padding: 10px;
  margin: 15px;
  border: 1px solid #bfc0c0;
  border-radius: 2px;
  box-shadow: 2px 2px 0px #bfc0c0;
`;

const StyledDate = styled.div`
  justify-self: start;
`;

const StyledCompany = styled.div`
  font-weight: bold;
`;

const StyledAmount = styled.div`
  font-weight: bold;
  justify-self: end;
`;

function Card({ cardData, ...props }) {
  function renderCard(cardData) {
    return (
      <StyledCard key={Math.random(10000)} {...props}>
        <StyledDate>{cardData.date}</StyledDate>
        <br />
        <StyledCompany>{cardData.company}</StyledCompany>
        <StyledAmount>{cardData.amount} €</StyledAmount>
      </StyledCard>
    );
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
      {cardData
        .slice()
        .sort(sortDate)
        .map(renderCard)}
    </>
  );
}

Card.propTypes = {
  date: PropTypes.instanceOf(Date),
  company: PropTypes.string,
  amount: PropTypes.number
};

export default Card;
