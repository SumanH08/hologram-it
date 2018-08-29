import React from "react";
import Reflux from "reflux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import ViewHologramPage from "./Components/ViewHologramPage.js";
import ConversionPage from "./Components/ConversionPage.js";
import NavMenu from "./Components/NavMenu.js";
import { UploadPage } from "./Components/UploadPage.js";

class App extends Reflux.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavMenu />
            <Switch>
              <Route path="/edit/:imageid" component={ConversionPage} />
              <Route path="/new" component={UploadPage} />
              <Route path="/view" component={ViewHologramPage} />
              <Route path="/" component={HomePage} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
