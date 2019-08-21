import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4281a4;
  color: #fff;
  height: 50px;
`;

const Headline = styled.h1`
  font-size: 18px;
`;

const StyledLogo = styled.div`
  margin: 6px 15px 6px 10px;
  font-size: 18px;
`;

function Header({ title, headerIcon }) {
  return (
    <StyledHeader>
      <StyledLogo>{headerIcon}</StyledLogo>
      <Headline>{title}</Headline>
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  headerIcon: PropTypes.object
};

export default Header;
