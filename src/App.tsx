import * as React from "react";
import { Switch, Route } from "react-router-dom";
import "./styles/main.scss";
import Increment from "./components/Increment/Increment";
import Header from "./components/Header/Header";
import fontawesome from "./fontawesomeSVGConfig";
import GestioneKOSospesi from "./components/GestioneKOSospesi/GestioneKOSospesi";
import GestioneKO from "./components/GestioneKO/GestioneKO";
import GestioneKOSegnlazione from "./components/GestioneKOSegnalazione/GestioneKOSegnlazione";
import SospensioneVodafone from "./components/SospensioneVodafone/SospensioneVodafone";
import CanaliVendita from "./components/CanaliVendita/CanaliVendita";

fontawesome();

const AppRouter = () => (
  <div className="App">
    <Header />
    <main className="App__main">
      <Switch>
        <Route path="/"exact component={Increment} />
        <Route path="/gestioneKO" component={GestioneKO} />
        <Route path="/gestioneKOSospesi" component={GestioneKOSospesi} />
        <Route path="/gestioneKOSegnalazione" component={GestioneKOSegnlazione} />
        <Route path="/sospensioniVodafone" component={SospensioneVodafone} />
        <Route path="/canaliVendita" component={CanaliVendita} />
      </Switch>
    </main>
  </div>
);

export default AppRouter;
