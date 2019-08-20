import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import BackgroundImg from "../components/BackgroundImage";
import Fuse from "fuse.js";

const StyledContainer = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 5px;
`;

const StyledSearchbar = styled.input`
  width: 100%;
  border-radius: 15px;
  padding: 7px 20px 7px 20px;
  height: auto;
  border: 1px solid lightgrey;
  background-color: white;
`;

function Search({ cards, history }) {
  const [input, setInput] = React.useState("");

  function handleChange(event) {
    const value = event.target.value;
    setInput(value);
  }

  let options = {
    shouldSort: true,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: ["company", "project", "amount"]
  };
  let fuse = new Fuse(cards, options);
  let result = fuse.search(input);

  function handleCardClick(card) {
    history.replace(`/detail/${card._id}`);
  }
  function renderCard(result) {
    return (
      <Card
        key={result.item._id}
        company={result.item.company}
        amount={result.item.amount}
        date={result.item.date}
        paid={result.item.paid}
        onClick={() => handleCardClick(result.item)}
      />
    );
  }
  return (
    <>
      <Header title="Suche" headerIcon={<i className="fas fa-search" />} />
      <BackgroundImg src="background_img.png" />
      <StyledContainer>
        <StyledSearchbar
          type="search"
          placeholder="Suchbegriff eingeben"
          onChange={handleChange}
        />
        <div>{result.map(renderCard)}</div>
      </StyledContainer>
    </>
  );
}

export default Search;
