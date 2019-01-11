import * as React from "react";
import { Switch, Route } from "react-router-dom";
import Increment from "../Increment/Increment";
import Header from "../Header/Header";
import fontawesome from "../../config/fontawesomeSVGConfig";
import GestioneKOSospesi from "../GestioneKOSospesi/GestioneKOSospesi";
import GestioneKO from "../GestioneKO/GestioneKO";
import GestioneKOSegnlazione from "../GestioneKOSegnalazione/GestioneKOSegnlazione";
import SospensioneVodafone from "../SospensioneVodafone/SospensioneVodafone";
import CanaliVendita from "../CanaliVendita/CanaliVendita";
import SegnalzioneEntita from "../SegnalazioniEntita/SegnalzioneEntita";

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
        <Route path="/segnlazioneEntita" component={SegnalzioneEntita} />
      </Switch>
    </main>
  </div>
);

export default AppRouter;
