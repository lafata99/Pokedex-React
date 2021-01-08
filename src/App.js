import React from "react";
import Pokedex from "./pokedex";
import Pokemon from "./pokemon";

import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <Switch>
        <Route exact path="/" render={(props) => <Pokedex {...props} />} />
        <Route exact path="/:pokemonId" render={(props) => <Pokemon {...props} />} />
    </Switch>
  );
}

export default App;
