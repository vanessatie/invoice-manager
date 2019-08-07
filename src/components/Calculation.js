import React from "react";
import Dinero from "dinero.js";
import styled from "styled-components";

const StyledSum = styled.div`
  display: flex;
  flex-direction: flex-end;
  font-weight: bold;
`;

const StyledTax = styled.div`
  display: flex;
  flex-direction: flex-end;
`;

export function SumCalculation({ cards }) {
  const total = cards
    .map(element => parseInt(element.amount * 100))
    .reduce((accumulator, currentValue) => {
      return accumulator.add(Dinero({ amount: currentValue }));
    }, Dinero({ amount: 0 }));
  let sum = total.toFormat("$0,0.00");

  return <StyledSum>{sum}</StyledSum>;
}

export function TaxCalculation({ cards }) {
  const tax = cards
    .map(element => parseInt(element.amount * 100))
    .reduce((accumulator, currentValue) => {
      return accumulator.add(Dinero({ amount: currentValue }));
    }, Dinero({ amount: 0 }))
    .multiply(0.19);
  let totalTax = tax.toFormat("$0,0.00");

  return <StyledTax>{totalTax}</StyledTax>;
}

export default SumCalculation;
