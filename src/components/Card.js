import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: auto;
  align-items: center;
  line-height: 1.5;
  padding: 10px;
  margin: 5px 20px 10px 20px;
  border: 1px solid #bfc0c0;
  border-radius: 2px;
  box-shadow: 2px 2px 0px #bfc0c0;
  background-color: white;
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
  color: black;
`;

const StyledPaid = styled.div`
  justify-self: start;
  color: #79c99e;
`;

const StyledUnpaid = styled.div`
  justify-self: start;
  color: #ef8354;
`;

function Card({ _id, date, file, company, amount, paid, onClick, ...props }) {
  return (
    <StyledCard key={_id} onClick={onClick} {...props}>
      <StyledPaid>
        {paid === true ? (
          <StyledPaid>
            <i className="fas fa-check" /> paid
          </StyledPaid>
        ) : (
          <StyledUnpaid>
            <i className="fas fa-exclamation" /> unpaid
          </StyledUnpaid>
        )}
      </StyledPaid>
      <StyledDate>
        {date}
        <StyledCompany>{company}</StyledCompany>
      </StyledDate>
      <StyledAmount>
        <br />
        {amount.replace(".", ".")} €
      </StyledAmount>
    </StyledCard>
  );
}

Card.propTypes = {
  date: PropTypes.string,
  company: PropTypes.string,
  amount: PropTypes.string,
  _id: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
