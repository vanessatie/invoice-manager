import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";
import axios from "axios";
import BackgroundImg from "../components/BackgroundImage";
import { Document, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
  pdfjs.version
}/pdf.worker.js`;

const StyledForm = styled.form`
  padding: 10px;
  display: grid;
  grid-gap: 10px;
`;
const StyledInput = styled.input`
  width: 100%;
  border: 1px solid lightgrey;
  border-radius: 3px;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  color: #2d3142;
  margin-top: 5px;
  padding: 3px;
  padding-left: 5px;
  ::placeholder {
    color: #bfc0c0;
  }
  input[type="file"] {
    display: none;
  }
`;

const StyledLabel = styled.label`
  margin-top: 15px;
`;

const StyledImage = styled.img`
  width: 50%;
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

function Form({ history, onCreate, match, cards }) {
  const [loading, setLoading] = React.useState(false);
  const itemToEdit =
    match.params.id &&
    cards &&
    cards.find(card => card._id === match.params.id);

  const [image, setImage] = React.useState("");
  function handleCancel() {
    history.push("/");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const card = {
      ...(itemToEdit ? itemToEdit : {}),
      date: form.inputDate.value,
      company: form.inputName.value,
      project: form.inputProject.value,
      amount: form.inputAmount.value,
      file: image || (itemToEdit && itemToEdit.file)
    };
    onCreate(card, history);
  }

  function uploadImage(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", PRESET);

    setLoading(true);
    axios
      .post(url, formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })
      .then(onImageSave)
      .catch(err => console.error(err));
  }
  function onImageSave(response) {
    setImage(response.data.url);
    setLoading(false);
  }

  function getToday() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();

    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    today = year + "-" + month + "-" + day;
    return today;
  }

  return (
    <>
      <Header
        title={itemToEdit ? "Rechnung bearbeiten" : "Neue Rechnung"}
        headerIcon={
          itemToEdit ? (
            <i className="far fa-edit" />
          ) : (
            <i className="fas fa-plus" />
          )
        }
      />
      <BackgroundImg src="background_img.png" />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Eingangsdatum:
          <StyledInput
            type="date"
            defaultValue={(itemToEdit && itemToEdit.date) || getToday()}
            max={getToday()}
            name="inputDate"
            required
          />
        </StyledLabel>
        <StyledLabel>
          Rechnungsaussteller:
          <StyledInput
            name="inputName"
            defaultValue={(itemToEdit && itemToEdit.company) || ""}
            placeholder="z.B. Holzland GmbH"
          />
        </StyledLabel>
        <StyledLabel>
          Projekt/ Kommission:
          <StyledInput
            type="textarea"
            rows="8"
            placeholder="Projektname"
            name="inputProject"
            defaultValue={(itemToEdit && itemToEdit.project) || ""}
          />
        </StyledLabel>
        <StyledLabel>
          Rechnungsbetrag:
          <StyledInput
            name="inputAmount"
            type="number"
            step="0.01"
            placeholder="z.B. 123.45"
            defaultValue={(itemToEdit && itemToEdit.amount) || ""}
            id="amount"
            required
          />
        </StyledLabel>

        <StyledLabel className="fileUpload">
          Bild hinzufügen:
          <div>
            {image || (itemToEdit && itemToEdit.file) ? (
              <StyledImage
                src={image || (itemToEdit && itemToEdit.file)}
                alt="Keine Vorschau verfügbar"
              />
            ) : (
              <StyledInput
                type="file"
                name="file[]"
                id="upload"
                onChange={uploadImage}
                accept="image/*,.pdf"
                multiple
              />
            )}
          </div>
        </StyledLabel>
        {image || (itemToEdit && itemToEdit.file) ? (
          <div>
            <StyledLabel className="fileUpload">Bild ändern:</StyledLabel>
            <StyledInput
              type="file"
              name="file"
              id="upload"
              onChange={uploadImage}
              accept="image/*,.pdf"
              multiple
            />
          </div>
        ) : (
          <div />
        )}

        <ButtonGroup>
          <Button onClick={handleCancel} kind="cancel">
            Abbrechen
          </Button>

          <Button kind="submit" disabled={loading}>
            {loading ? "Bitte warten" : itemToEdit ? "Speichern" : "Hinzufügen"}
          </Button>
        </ButtonGroup>
      </StyledForm>
    </>
  );
}

Form.propTypes = {
  onCreate: PropTypes.func,
  cards: PropTypes.array.isRequired
};

export default Form;
