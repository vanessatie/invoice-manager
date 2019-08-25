import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";
import BackgroundImg from "../components/BackgroundImage";

const StyledContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 5px;
  font-size: 1rem;
`;

const StyledDate = styled.div`
  justify-self: flex-start;
`;

const StyledPaid = styled.div`
  justify-self: flex-end;
  color: #79c99e;
`;
const StyledUnpaid = styled.div`
  justify-self: flex-end;
  color: #ef8354;
`;

const StyledCompany = styled.div`
  justify-self: flex-start;
  font-weight: bold;
`;

const StyledProject = styled.div`
  justify-self: flex-start;
  padding: 10px 15px 5px 15px;
`;

const StyledCategory = styled(Button)`
  width: 40%;
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
  width: 100%;
  border: 1px solid #bfc0c0;
  border-radius: 2px;
  box-shadow: 2px 2px 0px #bfc0c0;
  background-color: white;
`;

const StyledPreviewButton = styled.a`
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

function Details({ cards, match, history, onDelete }) {
  const card = cards && cards.find(card => card._id === match.params.id);
  const [showDialog, setShowDialog] = React.useState(false);

  if (!card) {
    return null;
  }

  function handleBack() {
    history.goBack();
  }

  function handleDeleteConfirmation() {
    onDelete(card._id);
    history.push("/overview");
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
      <BackgroundImg src="/background_img.png" />
      <StyledContainer>
        <StyledDate>{card.date}</StyledDate>
        <StyledPaid>
          {card.paid === true ? (
            <StyledPaid>
              <i className="fas fa-check" /> paid
            </StyledPaid>
          ) : (
            <StyledUnpaid>
              <i className="fas fa-exclamation" /> unpaid
            </StyledUnpaid>
          )}
        </StyledPaid>

        <StyledCompany>{card.company}</StyledCompany>
        <StyledProject>{card.project}</StyledProject>
        <StyledCategory kind="category">{card.category}</StyledCategory>
        <StyledAmount>{card.amount.replace(".", ",")} €</StyledAmount>
        <br />
        {card.file && card.file.endsWith(".pdf") ? (
          <StyledImage
            src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
            style={{ width: 100 }}
          />
        ) : (
          <StyledImage
            src={
              card.file
                ? card.file
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2000px-No_image_available.svg.png"
            }
            alt={card.company}
          />
        )}
        {card.file ? (
          <StyledPreviewButton href={card.file} target="_blank">
            <Button>Detailansicht</Button>
          </StyledPreviewButton>
        ) : (
          <div />
        )}

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
            Zurück
          </Button>
        </ButtonGroup>
      </StyledContainer>
    </>
  );
}

Details.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object,
  onDelete: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    })
  })
};

export default Details;
