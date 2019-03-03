import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import NodeTypeManagement from "../NodeTypeManagement/NodeTypeManagement";
import Collapsible from "react-collapsible";
import NodeDetails from "../NodeDetails/NodeDetails";
import 'antd/lib/button/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/modal/style/index.css';
import 'antd/lib/notification/style/index.css';
import NodeDetailsManangement from "../NodeDetailsManagement/NodeDetailsManangement";
class NodeManagement extends BaseComponent {
  private setState: Function;

  constructor() {
    super();
    console.log("NodeManagement constructor");
  }

  public nodeManagement = (componentProps: any): JSX.Element => {

    React.useEffect(()=>{
      this.EE.emit("onNavigation",[{breadCrumbName:"Home",breadCrumbLink:"/"},{breadCrumbName:"House Keeping"},{breadCrumbName:"Node Management"}]);
    },[]);
    return (
      <div className="NodeManagement">
          <NodeTypeManagement />
          <NodeDetailsManangement/> 
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.nodeManagement;
  }
}

const nodeManagement = new NodeManagement();

export default nodeManagement.getComponent();
