import styled from "styled-components";

const BackgroundImg = styled.img`
  position: absolute;
  position: fixed;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: opacity(0.1);
`;

export default BackgroundImg;
