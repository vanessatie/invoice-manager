import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cards from "../pages/Cards";
import Form from "../pages/Form";
import { getFromLocal, setToLocal } from "../services";
import uuid from "uuid/v1";
import Footer from "../components/Footer";
import Details from "../pages/Details";
import Dinero from "dinero.js";

Dinero.defaultCurrency = "EUR";
Dinero.globalLocale = "de-DE";

function App() {
  const [cards, setCards] = React.useState(getFromLocal("cards") || []);
  React.useEffect(() => setToLocal("cards", cards), [cards]);

  function handleCreate(card, history) {
    const newCard = { _id: uuid(), ...card };
    setCards([newCard, ...cards]);

    history.replace(`/detail/${newCard._id}`);
  }

  function handleDeleteCard(index) {
    setCards([...cards.slice(0, index), ...cards.slice(index + 1)]);
  }

  function handleEdit(card) {
    const index = cards.findIndex(item => item._id === card._id);
    setCards([...cards.slice(0, index), card, ...cards.slice(index + 1)]);
  }

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route
          path="/detail/:id"
          render={props => (
            <Details cards={cards} onDelete={handleDeleteCard} {...props} />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <Form onCreate={handleCreate} cards={cards} {...props} />
          )}
        />
        <Route
          path="/edit/:id"
          render={props => (
            <Form onCreate={handleEdit} cards={cards} {...props} />
          )}
        />

        <Route path="/" render={props => <Cards cards={cards} {...props} />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
