import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cards from "../pages/Cards";
import Form from "../pages/Form";
import cardData from "../pages/__mock__/cards.json";
import uuid from "uuid/v1";

function App() {
  const [cards, setCards] = React.useState(cardData);

  function handleCreate(card) {
    const newCard = { _id: uuid, ...card };
    setCards([newCard, ...cards]);
  }

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route
          path="/add"
          render={props => <Form onCreate={handleCreate} {...props} />}
        />
        <Route path="/" render={props => <Cards cards={cards} {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
