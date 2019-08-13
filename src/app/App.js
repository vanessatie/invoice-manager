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
  const [itemToEdit, setItemToEdit] = React.useState("");
  React.useEffect(() => setToLocal("cards", cards), [cards]);

  function handleCreate(card, history) {
    const newCard = { _id: uuid(), ...card };
    setCards([newCard, ...cards]);

    history.replace(`/detail/${newCard._id}`);
  }

  function handleDeleteCard(index) {
    console.log(index);
    setCards([...cards.slice(0, index), ...cards.slice(index + 1)]);
  }

  function handleEdit(card, history) {
    setItemToEdit(card);
    //onEdit(cards.findIndex(item => itemToEdit === item));
    history.push("/add/");
  }
  console.log(itemToEdit);
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route
          path="/detail/:id"
          render={props => (
            <Details
              cards={cards}
              onDelete={handleDeleteCard}
              onEdit={handleEdit}
              {...props}
            />
          )}
        />
        <Route
          path="/add"
          render={props => (
            <Form
              onCreate={handleCreate}
              cards={cards}
              itemToEdit={itemToEdit}
              {...props}
            />
          )}
        />

        <Route path="/" render={props => <Cards cards={cards} {...props} />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
