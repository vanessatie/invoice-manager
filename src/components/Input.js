import styled from "styled-components";

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 15px;
  padding: 8px 20px 8px 20px;
  height: auto;
  border: 1px solid lightgrey;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif;
  color: #2d3142;
  padding-left: 15px;
  font-size: 0.8rem;
  ::placeholder {
    color: lightgrey;
  }
`;

export const StyledDropDown = styled.select`
  text-align-last: center;
  border: 1px solid lightgrey;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  background-color: white;
  width: 100%;
  text-align: center;
  border-radius: 15px;
  padding: 8px 20px 8px 20px;
  height: auto;
  margin: 0;
`;

export default StyledInput;
