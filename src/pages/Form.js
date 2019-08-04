import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Button from "../components/Button";
import axios from "axios";

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
  margin-top: 5px;
`;

const StyledLabel = styled.label`
  margin-top: 15px;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

function Form({ history, onCreate, upload }) {
  const [image, setImage] = React.useState("");
  function handleCancel() {
    history.push("/");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const card = {
      date: form.inputDate.value,
      company: form.inputName.value,
      amount: form.inputAmount.value
    };

    onCreate(card);
    history.replace("/");
  }
  function upload(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", PRESET);

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
  }

  return (
    <>
      <Header title="Add Invoice" />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Eingangsdatum:
          <StyledInput
            type="date"
            name="inputDate"
            placeholder="Bitte Datum auswählen"
            required
          />
        </StyledLabel>
        <StyledLabel>
          Rechnungsaussteller:
          <StyledInput name="inputName" placeholder="z.B. Holzland GmbH" />
        </StyledLabel>
        <StyledLabel>
          Rechnungsbetrag:
          <StyledInput
            name="inputAmount"
            type="number"
            step="0.01"
            placeholder="z.B. 123.45"
          />
        </StyledLabel>
        <StyledLabel>
          Bild hinzufügen:
          <div>
            {image ? (
              <img src={image} alt="" style={{ width: "50%" }} />
            ) : (
              <input type="file" name="file" onChange={upload} multiple />
            )}
          </div>
        </StyledLabel>
        <ButtonGroup>
          <Button onClick={handleCancel} kind="cancel">
            Abbrechen
          </Button>
          <Button kind="submit">Hinzufügen</Button>
        </ButtonGroup>
      </StyledForm>
    </>
  );
}

Form.propTypes = {
  onCreate: PropTypes.func
};

export default Form;
