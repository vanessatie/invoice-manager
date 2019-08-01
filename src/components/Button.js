import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
  &:disabled {
    background-color: #bfc0c0;
  }
`;

export const LinkButton = ({ children, to, ...props }) => (
  <Link to={to}>
    <StyledButton />
  </Link>
);

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string
};

export default Button;
