import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4281a4;
  color: #fff;
`;

const Headline = styled.h1`
  font-size: 18px;
`;

const StyledLogo = styled.img`
  margin: 6px 15px 6px 15px;
`;

function Header({ title }) {
  return (
    <StyledHeader>
      <StyledLogo src="icon_file.png" />
      <Headline>{title}</Headline>
    </StyledHeader>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
