import React from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import cardData from "../pages/__mock__/cards.json";

function Cards() {
  return (
    <>
      <Header title="Your Invoices" />
      <Card cardData={cardData} />
    </>
  );
}

export default Cards;
