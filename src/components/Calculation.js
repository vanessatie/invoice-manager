import React from "react";
import Dinero from "dinero.js";
import styled from "styled-components";

const StyledSum = styled.div`
  text-align: end;
  font-weight: bold;
  text-decoration: underline;
  line-height: 1.5;
  margin-right: 20px;
`;

const StyledTax = styled.div`
  text-align: end;
  line-height: 1.5;
  margin-right: 20px;
`;

const StyledMessage = styled.div`
  text-align: center;
  line-height: 1.5;
`;

export function SumCalculation({ cards }) {
  const total = cards
    .map(element => parseInt(element.amount * 100))
    .reduce((accumulator, currentValue) => {
      return accumulator.add(Dinero({ amount: currentValue }));
    }, Dinero({ amount: 0 }));
  let sum = total.toFormat("$0,0.00");
  if (sum === "0,00 €") {
    return (
      <>
        <StyledMessage>
          <br />
          Keine Rechnungen vorhanden
        </StyledMessage>
      </>
    );
  }

  return <StyledSum>Summe: {sum}</StyledSum>;
}

export function TaxCalculation({ cards }) {
  const tax = cards
    .map(element => parseInt(element.amount * 100))
    .reduce((accumulator, currentValue) => {
      return accumulator.add(Dinero({ amount: currentValue }));
    }, Dinero({ amount: 0 }))
    .multiply(0.19);
  let totalTax = tax.toFormat("$0,0.00");
  if (totalTax === "0,00 €") {
    return <div />;
  }
  return <StyledTax>MwSt.: {totalTax}</StyledTax>;
}

export default SumCalculation;
