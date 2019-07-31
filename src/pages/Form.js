import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Button from "../components/Button";

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

function Form({ history }) {
  function handleCancel() {
    history.push("/");
  }
  return (
    <>
      <Header title="Add Invoice" />
      <StyledForm>
        <StyledLabel>
          Eingangsdatum:
          <StyledInput type="date" placeholder="Bitte Datum auswählen" />
        </StyledLabel>

        <StyledLabel>
          Rechnungsaussteller:
          <StyledInput placeholder="z.B. Holzland GmbH" />
        </StyledLabel>
        <StyledLabel>
          Rechnungsbetrag:
          <StyledInput type="number" placeholder="z.B. 123.45" />
        </StyledLabel>
        <ButtonGroup>
          <Button onClick={handleCancel} kind="cancel">
            Cancel
          </Button>
          <Button kind="submit">Add</Button>
        </ButtonGroup>
      </StyledForm>
    </>
  );
}

export default Form;
