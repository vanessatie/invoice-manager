import React from "react";
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cards from "../pages/Cards";
import Form from "../pages/Form";
import cardData from "../pages/__mock__/cards.json";

console.log(cardData);

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Switch>
        <Route path="/add" render={props => <Form {...props} />} />
        <Route
          path="/"
          render={props => <Cards cardData={cardData} {...props} />}
        />
      </Switch>
    </Router>
  );
}

export default App;
