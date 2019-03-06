import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Header from "../Header/Header";
import fontawesome from "../../config/fontawesomeSVGConfig";
import deviceCheckConfig from "../../config/deviceCheckConfig";
import Spinner from "../UI/Spinner/Spinner";
import Backdrop from "../UI/Backdrop/Backdrop";
// import "../../Utils/MasterDataContainer";
import EE from "../../EventEmitter";
import Navigation from "../Navigation/Navigation";
import CoverSpinner from "../UI/CoverSpinner/CoverSpinner";
import Login from "../Login/Login";
import BaseComponent from "../BaseComponent/BaseComponent";

const NodeManagement = React.lazy(()=>import("../NodeManagement/NodeManagement"));
const UserManagement = React.lazy(()=>import("../UserManagement/UserManagement"));
const Home = React.lazy(() => import("../Home/Home"));


deviceCheckConfig() ? console.log("mobile") : console.log("desktop");
fontawesome();

class AppContainer extends BaseComponent{

  private isAuthenticated:boolean;
  private setIsAuthenticated:Function;

  public onSucessFullAuthentication = (isAuthenticated:boolean)=>{
    this.setIsAuthenticated(isAuthenticated);
  }
  constructor(){
    super();
  }

  public appComponent = () => {
    const[isAuthenticated,setIsAuthenticated] = React.useState<boolean>(false);
  
    this.isAuthenticated = isAuthenticated;
    this.setIsAuthenticated = setIsAuthenticated;
  
      React.useEffect(()=>{
  
        EE.on("onSucessFullAuthentication",this.onSucessFullAuthentication)
      },[]);
      
      let App = (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Login} />
          <Redirect to="/" />
        </Switch>
      );
      if(isAuthenticated){
        App = <div className="App">
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
      }
    return App;
  }

public getComponent():React.FunctionComponent{
  return this.appComponent;
}
}

const appContainer = new AppContainer();

export default appContainer.getComponent();
