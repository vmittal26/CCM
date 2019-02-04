import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../Header/Header";
import fontawesome from "../../config/fontawesomeSVGConfig";
import deviceCheckConfig from "../../config/deviceCheckConfig";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";

const GestioneKO = React.lazy(() => import("../GestioneKO/GestioneKO"));
const SospensioneVodafone = React.lazy(() => import("../SospensioneVodafone/SospensioneVodafone"));
const CanaliVendita = React.lazy(() => import("../CanaliVendita/CanaliVendita"));
const SegnalzioneEntita = React.lazy(() => import("../SegnalazioniEntita/SegnalzioneEntita"));


const GestioneKOSospesi = React.lazy(() => import("../GestioneKOSospesi/GestioneKOSospesi"));
const GestioneKODetailPageFase2 = React.lazy(() => import("../GestioneKODetailPageFase2/GestioneKODetailPageFase2"));
const Home = React.lazy(() => import("../Home/Home"));

deviceCheckConfig() ? console.log("mobile") : console.log("desktop");
fontawesome();
const AppRouter = () => (
  <div className="App">
    <Header />
    <div className="App__main">
      <Switch>
          <React.Suspense fallback={<><Backdrop show iswhite/><Spinner/></>}>
            <Route path="/" exact component={(props:any) => <Home {...props} />}/>
            <Route path="/gestioneKOSospesi" component={(props:any) => <GestioneKOSospesi {...props} />} />
            <Route path="/detailPageFase2" component={(props:any) => <GestioneKODetailPageFase2 {...props} />} />
          </React.Suspense>
        {/* <Route path="/gestioneKO" component={GestioneKO} />
        <Route path="/gestioneKOSospesi" component={(GestioneKOSospesi)} />
        <Route path="/gestioneKOSegnalazione" component={GestioneKOSegnlazione} />
        <Route path="/sospensioniVodafone" component={SospensioneVodafone} />
        <Route path="/canaliVendita" component={CanaliVendita} />
        <Route path="/segnlazioneEntita" component={SegnalzioneEntita} />
        <Route path="/detailPageWithFormik" component={DetailPageWithFormik} />
        <Route path="/detailPageFase2" component={GestioneKODetailPageFase2} /> */}
      </Switch>
    </div>
  </div>
);

export default AppRouter;
