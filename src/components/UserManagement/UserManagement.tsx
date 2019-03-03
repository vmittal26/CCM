import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
class UserMangementContainer  extends BaseComponent {
  private setState: Function;

  constructor() {
    super();
    console.log("NodeManagement constructor");
  }

  public userManagement = (componentProps: any): JSX.Element => {

    React.useEffect(()=>{
      this.EE.emit("onNavigation",[{breadCrumbName:"Home",breadCrumbLink:"/"},{breadCrumbName:"House Keeping"},{breadCrumbName:"User Management"}]);
    },[]);
    return (
      <div className="UserManagement">
          <h4>User Management</h4>
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.userManagement;
  }
}

const userManagement = new UserMangementContainer();

export default userManagement.getComponent();
