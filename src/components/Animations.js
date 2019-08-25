import { keyframes } from "styled-components";

export const FadeIn = keyframes`
0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
`;
