import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledFooter = styled.div`
  background-color: #4281a4;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledIcon = styled.div`
  font-size: 1.5rem;
  color: white;
`;

function Footer() {
  return (
    <StyledFooter>
      <Link to="/">
        <StyledIcon>
          <i className="fas fa-list" />
        </StyledIcon>
      </Link>
      <Link to="/add">
        <StyledIcon>
          <i className="fas fa-plus" />
        </StyledIcon>
      </Link>
    </StyledFooter>
  );
}

export default Footer;
