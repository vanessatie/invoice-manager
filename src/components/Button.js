import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const color = {
  cancel: `
  border-color: #ef8354;
  color: #ef8354;
  `,
  submit: `border-color: #79C99E;
  color: #79C99E;
  `,
  neutral: `border-color: #bfc0c0;
  color: #bfc0c0;
  `,
  category: `border-color: #4281a4;
  color: #4281a4;
  `
};

const getColor = ({ kind = "neutral" }) => color[kind];

const StyledButton = styled.button`
  border-radius: 15px;
  margin: 5px;
  padding: 10px 20px 10px 20px;
  height: auto;
  width: auto;
  background-color: white;
  font-weight: bold;
  border: 1px solid;
  ${getColor};
  &:disabled {
    color: #bfc0c0;
    border-color: #bfc0c0;
    background-color: #f2f5f5;
  }
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string
};

export default Button;
