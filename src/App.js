import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import ViewHologramPage from "./Components/ViewHologramPage.js";
import ConversionPage from "./Components/ConversionPage.js";

class App extends Reflux.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/new" component={ConversionPage} />
            <Route path="/view" component={ViewHologramPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
