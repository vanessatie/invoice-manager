import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cards from "../pages/Cards";
import Form from "../pages/Form";
import { getFromLocal, setToLocal } from "../services";
import uuid from "uuid/v1";
import Footer from "../components/Footer";

function App() {
  const [cards, setCards] = React.useState(getFromLocal("cards") || []);

  React.useEffect(() => setToLocal("cards", cards), [cards]);

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

      <Footer />
    </Router>
  );
}

export default App;
