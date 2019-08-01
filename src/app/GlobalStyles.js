import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
    box-sizing: border-box;
    }
html, body {
    margin: 0;
}
body {
    font-family: Arial, Helvetica, sans-serif;
    color: #2d3142;
    font-size: 0.8rem;
    margin-bottom: 60px;
}
`;
