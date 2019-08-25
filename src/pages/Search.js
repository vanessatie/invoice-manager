import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Header from "../components/Header";
import Card from "../components/Card";
import BackgroundImg from "../components/BackgroundImage";
import { StyledDropDown } from "../components/Input";
import Fuse from "fuse.js";
import StyledInput from "../components/Input";

const StyledContainer = styled.div`
  padding: 20px 20px 10px 20px;
  display: grid;
  grid-gap: 20px;
`;
const StyledComment = styled.div`
  text-align: center;
  margin: -12px;
`;

function Search({ cards, history }) {
  const [input, setInput] = React.useState("");
  const [filteredCategory, setFilteredCategory] = React.useState("");

  function handleChange(event) {
    const value = event.target.value;
    setInput(value);
    setFilteredCategory("");
  }

  function handleCategoryChange(event) {
    setInput("");
    setFilteredCategory(event.target.value);
  }
  const filteredByCategory = cards.filter(filterCategory);
  function filterCategory(element) {
    if (element.category === filteredCategory) {
      return element;
    }
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
        project={result.item.project}
        category={result.item.category}
        amount={result.item.amount}
        date={result.item.date}
        paid={result.item.paid}
        onClick={() => handleCardClick(result.item)}
      />
    );
  }

  function renderCardFilter(filteredByCategory) {
    return (
      <Card
        key={filteredByCategory._id}
        company={filteredByCategory.company}
        project={filteredByCategory.project}
        category={filteredByCategory.category}
        amount={filteredByCategory.amount}
        date={filteredByCategory.date}
        paid={filteredByCategory.paid}
        onClick={() => handleCardClick(filteredByCategory)}
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
        <StyledComment>oder</StyledComment>
        <StyledDropDown
          value={filteredCategory}
          name="inputCategory"
          onChange={event => handleCategoryChange(event)}
          required
        >
          <option value="Kategorie wählen">Kategorie wählen</option>
          <option value="Material">Material</option>
          <option value="Büromaterial">Büromaterial</option>
          <option value="Maschinen">Maschinen</option>
          <option value="Anderes">Anderes</option>
        </StyledDropDown>
      </StyledContainer>
      <div>
        {input
          ? filteredCategory
            ? filteredByCategory.map(renderCard)
            : result.map(renderCard)
          : filteredByCategory.map(renderCardFilter)}
      </div>
    </>
  );
}

Search.propTypes = {
  cards: PropTypes.array.isRequired,
  history: PropTypes.object
};

export default Search;
