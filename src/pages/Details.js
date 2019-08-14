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

const StyledProject = styled.div`
  justify-self: flex-start;
  padding: 15px;
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

const StyledAlert = styled.div`
  font-weight: bold;
`;

function Details({ cards, match, history, onDelete }) {
  const card = cards && cards.find(card => card._id === match.params.id);
  const [showDialog, setShowDialog] = React.useState(false);

  if (!card) {
    return null;
  }

  function handleBack() {
    history.push("/");
  }

  function handleDeleteConfirmation() {
    onDelete(cards.findIndex(item => card === item));
    history.push("/");
  }

  function handleEdit() {
    history.push(`/edit/${card._id}`);
  }

  return (
    <>
      <Header title="Details" />
      <StyledContainer>
        <StyledDate>{card.date}</StyledDate>
        <StyledCompany>{card.company}</StyledCompany>
        <StyledProject>{card.project}</StyledProject>
        <StyledAmount>{card.amount.replace(".", ",")} €</StyledAmount>
        <br />
        <StyledImage
          src={
            card.file
              ? card.file
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"
          }
          alt={card.company}
        />
        {showDialog && (
          <div>
            <StyledAlert>
              Soll die Rechnung wirklich gelöscht werden?
            </StyledAlert>
            <ButtonGroup>
              <Button kind="neutral" onClick={() => setShowDialog(false)}>
                Abbrechen
              </Button>
              <Button kind="cancel" onClick={handleDeleteConfirmation}>
                Ja, löschen
              </Button>
            </ButtonGroup>
          </div>
        )}
        <ButtonGroup>
          <Button onClick={handleBack} kind="submit">
            Zur Übersicht
          </Button>
          <Button onClick={handleEdit} kind="neutral">
            Bearbeiten
          </Button>
          <Button onClick={() => setShowDialog(true)} kind="cancel">
            Löschen
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
