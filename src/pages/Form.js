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
  width: 100%;
  display: flex;
  justify-content: center;
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
      amount: form.inputAmount.value,
      file: image
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
      <Header title="Add Invoice" />
      <StyledForm onSubmit={handleSubmit}>
        <StyledLabel>
          Eingangsdatum:
          <StyledInput
            type="date"
            defaultValue={getToday()}
            name="inputDate"
            required
          />
        </StyledLabel>
        <StyledLabel>
          Rechnungsaussteller:
          <StyledInput name="inputName" placeholder="z.B. Holzland GmbH" />
        </StyledLabel>
        <StyledLabel htmlFor="amount">
          Rechnungsbetrag:
          <StyledInput
            name="inputAmount"
            type="number"
            step="0.01"
            placeholder="z.B. 123.45"
            id="amount"
          />
        </StyledLabel>
        <StyledLabel htmlFor="upload" className="fileUpload">
          Bild hinzufügen:
          <div>
            {image ? (
              <StyledImage src={image} alt="" />
            ) : (
              <StyledInput
                type="file"
                name="file"
                id="upload"
                onChange={upload}
              />
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
