import React from "react";
import styled from "styled-components";

const color = {
  cancel: `
  background-color: #ef8354;
  `,
  submit: `background-color: #79C99E;`,
  neutral: `background-color: #bfc0c0;`
};

const getColor = ({ kind = "neutral" }) => color[kind];

const StyledButton = styled.button`
  border-radius: 3px;
  margin: 5px;
  padding: 5px;
  height: 30px;
  width: 80px;
  ${getColor};
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
