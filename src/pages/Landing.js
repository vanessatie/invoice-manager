import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BackgroundImg from "../components/BackgroundImage";
import Button from "../components/Button";
import { FadeIn } from "../components/Animations";

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 20px;
  font-size: 1.7rem;
  color: #4281a4;
  padding: 60px 20px 20px 20px;
  text-decoration: none;
`;

const StyledText = styled.div`
  display: inline;
  color: #4281a4;
  text-decoration: none;
`;

const StyledIcon = styled.div`
  text-align: start;
  display: inline;
  padding-right: 12px;
`;

const LandingButton = styled(Button)`
  text-align: center;
  animation: ${FadeIn} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
  font-size: 1.2rem;
  color: #4281a4;
`;
const LandingButton2 = styled(Button)`
  text-align: center;
  animation: ${FadeIn} 1s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
  font-size: 1.2rem;
  color: #4281a4;
  text-decoration: none;
`;
const LandingButton3 = styled(Button)`
  text-align: center;
  animation: ${FadeIn} 1.4s cubic-bezier(0.39, 0.575, 0.565, 1) 1s both;
  font-size: 1.2rem;
  color: #4281a4;
  text-decoration: none;
`;

function Landing() {
  return (
    <>
      <Header
        title="Invoice-Manager"
        headerIcon={<i className="fas fa-file-invoice-dollar" />}
      />
      <BackgroundImg src="background_img.png" />
      <StyledContainer>
        <LandingButton kind="category">
          <Link to="/overview">
            <StyledText>
              <StyledIcon>
                <i className="fas fa-list" />
              </StyledIcon>
              Übersicht
            </StyledText>
          </Link>
        </LandingButton>
        <LandingButton2 kind="category">
          <Link to="/search">
            <StyledText>
              <StyledIcon>
                <i className="fas fa-search" />
              </StyledIcon>
              Suche
            </StyledText>
          </Link>
        </LandingButton2>
        <LandingButton3 kind="category">
          <Link to="/add">
            <StyledText>
              <StyledIcon>
                <i className="fas fa-plus" />
              </StyledIcon>
              Rechnung hinzufügen
            </StyledText>
          </Link>
        </LandingButton3>
      </StyledContainer>
    </>
  );
}

export default Landing;
