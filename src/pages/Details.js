import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";

const StyledContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-gap: 10px;
  font-size: 1rem;
`;

const StyledDate = styled.div`
  justify-self: flex-start;
`;

const StyledCompany = styled.div`
  justify-self: flex-start;
  font-weight: bold;
`;

const StyledAmount = styled.div`
  justify-self: flex-end;
  font-weight: bold;
`;

const StyledImage = styled.img`
  max-height: 80%;
  max-width: 80%;
  justify-self: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

function Details({ cards, match, history }) {
  const card = cards && cards.find(card => card._id === match.params.id);
  if (!card) {
    return null;
  }

  function handleBack() {
    history.push("/");
  }
  return (
    <>
      <Header title="Details" />
      <StyledContainer>
        <StyledDate>{card.date}</StyledDate>

        <StyledCompany>{card.company}</StyledCompany>
        <StyledAmount>{card.amount} €</StyledAmount>
        <br />
        <StyledImage
          src={
            card.file
              ? card.file
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"
          }
          alt={card.company}
        />
        <ButtonGroup>
          <Button onClick={handleBack} kind="submit">
            Zurück
          </Button>
        </ButtonGroup>
      </StyledContainer>
    </>
  );
}

Details.propTypes = {
  cards: PropTypes.array.isRequired
};

export default Details;
