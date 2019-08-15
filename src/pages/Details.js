import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";
import BackgroundImg from "../components/BackgroundImage";

const StyledContainer = styled.div`
  padding: 30px;
  display: grid;
  grid-gap: 5px;
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
  padding: 10px 15px 5px 15px;
`;

const StyledAmount = styled.div`
  justify-self: flex-end;
  font-weight: bold;
`;

const StyledImage = styled.img`
  max-height: 70%;
  max-width: 70%;
  justify-self: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
`;

const StyledAlert = styled.div`
  font-weight: bold;
  padding: 10px;
  margin: 5px 20px 10px 0;
  border: 1px solid #bfc0c0;
  border-radius: 2px;
  box-shadow: 2px 2px 0px #bfc0c0;
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
      <Header
        title="Details"
        headerIcon={<i className="fas fa-search-plus" />}
      />
      <BackgroundImg src="background_img.png" />
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
          <StyledAlert>
            Soll die Rechnung wirklich gelöscht werden?
            <ButtonGroup>
              <Button kind="neutral" onClick={() => setShowDialog(false)}>
                Abbrechen
              </Button>
              <Button kind="cancel" onClick={handleDeleteConfirmation}>
                Ja, löschen
              </Button>
            </ButtonGroup>
          </StyledAlert>
        )}
        <ButtonGroup>
          <Button onClick={() => setShowDialog(true)} kind="cancel">
            Löschen
          </Button>
          <Button onClick={handleEdit} kind="neutral">
            Bearbeiten
          </Button>
          <Button onClick={handleBack} kind="submit">
            Übersicht
          </Button>
        </ButtonGroup>
      </StyledContainer>
    </>
  );
}

Details.propTypes = {
  cards: PropTypes.array.isRequired,
  onDelete: PropTypes.func
};

export default Details;
