import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";
import BackgroundImg from "../components/BackgroundImage";
import { StyledInput, StyledDropDown } from "../components/Input";
import axios from "axios";

const StyledForm = styled.form`
  padding: 10px 20px 20px 20px;
  display: grid;
  grid-gap: 10px;
`;

const StyledCheckbox = styled.input`
  display: block;
  float: right;
`;

const StyledLabel = styled.label`
  margin-top: 10px;
  line-height: 1.5rem;
`;

const StyledCheckboxLabel = styled.label`
  margin-top: 15px;
  float: left;
  width: 25%;
`;

const StyledImage = styled.img`
  max-width: 50%;
  justify-self: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

function Form({ history, onCreate, match, cards }) {
  const [loading, setLoading] = React.useState(false);
  const [paid, setPaid] = React.useState(false);
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
      category: category || (itemToEdit && itemToEdit.category),
      amount: form.inputAmount.value,
      paid: paid || (itemToEdit && itemToEdit.paid),
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

  function handlePaid(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setPaid(value);
  }

  const [category, setCategory] = React.useState(
    (itemToEdit && itemToEdit.category) || "Material"
  );
  function onCategorySelect(event) {
    setCategory(event.target.value);
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
      <BackgroundImg src="/background_img.png" />
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
            placeholder="Firmenname"
            required
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
            required
          />
        </StyledLabel>
        <StyledLabel>
          Kategorie: (bitte auswählen)
          <StyledDropDown
            value={category}
            name="inputCategory"
            onChange={event => onCategorySelect(event)}
            placeholder="Bitte wählen"
            required
          >
            <option value="Material">Material</option>
            <option value="Büromaterial">Büromaterial</option>
            <option value="Maschinen">Maschinen</option>
            <option value="Anderes">Anderes</option>
          </StyledDropDown>
        </StyledLabel>

        <StyledLabel>
          Rechnungsbetrag:
          <StyledInput
            name="inputAmount"
            type="number"
            step="0.01"
            placeholder="Betrag in Euro"
            defaultValue={(itemToEdit && itemToEdit.amount) || ""}
            id="amount"
            required
          />
        </StyledLabel>

        <StyledCheckboxLabel className="paidBox">
          <StyledCheckbox
            type="checkbox"
            name="isPaid"
            defaultChecked={(itemToEdit && itemToEdit.paid) || paid}
            onChange={handlePaid}
          />
          Bezahlt ?
        </StyledCheckboxLabel>

        <StyledLabel className="fileUpload">
          Bild hinzufügen:
          <div>
            {image || (itemToEdit && itemToEdit.file) ? (
              <StyledImage
                src={
                  image || (itemToEdit && itemToEdit.file) ? (
                    image || (itemToEdit && itemToEdit.file)
                  ) : (
                    <div />
                  )
                }
                alt="Keine Vorschau verfügbar"
              />
            ) : (
              <StyledInput
                type="file"
                name="file"
                id="upload"
                onChange={uploadImage}
                accept="image/*,.pdf"
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
  history: PropTypes.object,
  onCreate: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    })
  }),
  cards: PropTypes.array.isRequired
};

export default Form;
