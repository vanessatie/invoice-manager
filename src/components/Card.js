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

const StyledImage = styled.img`
  max-height: 40px;
  max-width: 40px;
  align-self: center;
`;

function Card({ _id, date, file, company, amount, onClick, ...props }) {
  return (
    <StyledCard key={_id} onClick={onClick} {...props}>
      <StyledImage
        src={
          file
            ? file
            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"
        }
        alt={company}
      />
      <StyledDate>
        {date}
        <StyledCompany>{company}</StyledCompany>
      </StyledDate>
      <StyledAmount>
        <br />
        {amount.replace(".", ",")} €
      </StyledAmount>
    </StyledCard>
  );
}

Card.propTypes = {
  date: PropTypes.string,
  company: PropTypes.string,
  amount: PropTypes.string,
  _id: PropTypes.string,
  file: PropTypes.string,
  onClick: PropTypes.func
};

export default Card;
