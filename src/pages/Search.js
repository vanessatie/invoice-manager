import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Card from "../components/Card";
import BackgroundImg from "../components/BackgroundImage";
import Fuse from "fuse.js";
import StyledInput from "../components/Input";

const StyledContainer = styled.div`
  padding: 20px 20px 10px 20px;
  display: grid;
  grid-gap: 5px;
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
    threshold: 0.2,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: ["company", "project", "amount", "category"]
  };
  let fuse = new Fuse(cards, options);
  let result = fuse.search(input);

  function handleCardClick(card) {
    history.push(`/detail/${card._id}`);
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
        <StyledInput
          type="search"
          placeholder="Suchbegriff eingeben..."
          onChange={handleChange}
          minLength="3"
        />
      </StyledContainer>
      <div>{result.map(renderCard)}</div>
    </>
  );
}

Search.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object
};
export default Search;
