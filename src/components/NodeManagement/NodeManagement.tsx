import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import NodeTypeManagement from "../NodeTypeManagement/NodeTypeManagement";
import Collapsible from "react-collapsible";
import NodeDetails from "../NodeDetails/NodeDetails";
class NodeManagement extends BaseComponent {
  private setState: Function;

  constructor() {
    super();
    console.log("NodeManagement constructor");
  }

  public nodeManagement = (componentProps: any): JSX.Element => {
    return (
      <div className="NodeManagement">
          <NodeTypeManagement />
          <NodeDetails/>
      </div>
    );
  };

  public getComponent(): React.FunctionComponent {
    return this.nodeManagement;
  }
}

const nodeManagement = new NodeManagement();

export default nodeManagement.getComponent();
