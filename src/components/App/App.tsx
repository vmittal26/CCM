import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "../Header/Header";
import fontawesome from "../../config/fontawesomeSVGConfig";
import deviceCheckConfig from "../../config/deviceCheckConfig";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";
// import "../../Utils/MasterDataContainer";
import EE from "../../EventEmitter";
import Navigation from "../Navigation/Navigation";
import CoverSpinner from "../UI/CoverSpinner/CoverSpinner";

const NodeManagement = React.lazy(()=>import("../NodeManagement/NodeManagement"));
const UserManagement = React.lazy(()=>import("../UserManagement/UserManagement"));
const Home = React.lazy(() => import("../Home/Home"));

deviceCheckConfig() ? console.log("mobile") : console.log("desktop");
fontawesome();

const AppRouter = () => (
  
  <div className="App">
    <Header />
    <div className="App__main" onClick={()=>{console.log("on click"); EE.emit("onHideSlider")}}>
    <Navigation />
      <Switch>
          <React.Suspense fallback={<><Backdrop show iswhite/><CoverSpinner/></>}>
            <Route path="/" exact component={(props:any) => <Home {...props} />}/>
            {/* <Route path="/userManagement" component={(props:any) => <UserManagement {...props} />} /> */}
            <Route path="/nodeManagement" component={(props:any) => <NodeManagement {...props} />} />
            <Route path="/userManagement" component={(props:any) => <UserManagement {...props} />} />
          </React.Suspense>
      </Switch>
    </div>
  </div>

);

export default AppRouter;
