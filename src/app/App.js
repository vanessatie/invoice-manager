import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cards from "../pages/Cards";
import Form from "../pages/Form";
import Search from "../pages/Search";
import Landing from "../pages/Landing";
import { getCards, postCard, deleteCard, patchCard } from "../services";

import Footer from "../components/Footer";
import Details from "../pages/Details";
import Dinero from "dinero.js";
import ScrollToTop from "../components/ScrollToTop";

Dinero.defaultCurrency = "EUR";
Dinero.globalLocale = "de-DE";

function App() {
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    getCards().then(result => setCards(result));
  }, []);

  function handleCreate(card, history) {
    postCard(card).then(result => setCards([result, ...cards]));

    history.push(`/overview`);
  }

  function handleDeleteCard(id) {
    deleteCard(id).then(result => {
      const index = cards.findIndex(card => card._id === id);
      setCards([...cards.slice(0, index), ...cards.slice(index + 1)]);
    });
  }

  function handleEdit(card, history) {
    patchCard(card, card._id).then(result => {
      const index = cards.findIndex(item => item._id === card._id);
      setCards([...cards.slice(0, index), result, ...cards.slice(index + 1)]);
    });
    history.push(`/detail/${card._id}`);
  }

  return (
    <Router>
      <GlobalStyles />
      <ScrollToTop>
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
          <Route
            path="/search"
            render={props => <Search cards={cards} {...props} />}
          />

          <Route
            path="/overview"
            render={props => <Cards cards={cards} {...props} />}
          />
          <Route path="/" render={props => <Landing {...props} />} />
        </Switch>
        <Footer />
      </ScrollToTop>
    </Router>
  );
}

export default App;
