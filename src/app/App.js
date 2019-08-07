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
import Calculation from "../components/Calculation";

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

  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route
          path="/detail/:id"
          render={props => <Details cards={cards} {...props} />}
        />
        <Route
          path="/add"
          render={props => <Form onCreate={handleCreate} {...props} />}
        />
        <Route
          path="/calcTest"
          render={props => <Calculation cards={cards} {...props} />}
        />

        <Route path="/" render={props => <Cards cards={cards} {...props} />} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
