import React from "react";
import GlobalStyles from "./GlobalStyles";
import Header from "../components/Header";
import Card from "../components/Card";
import cardData from "../pages/__mock__/cards.json";

console.log(cardData);

function App() {
  return (
    <>
      <GlobalStyles />
      <Header title="TestTitle" />
      <Card cardData={cardData} />
    </>
  );
}

export default App;
