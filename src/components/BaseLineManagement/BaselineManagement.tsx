import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import { Tree } from "antd";
const { TreeNode } = Tree;
import "antd/lib/tree/style/index.css";
import treeData from "./treeDataConfig";

class BaseLineManagementContainer extends BaseComponent {
  constructor() {
    super();
  }
  public baseLineManagementComponent = (props: any): JSX.Element => {
    return (
     <></>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.baseLineManagementComponent;
  }
}

export const baseLineManagementContainer = new BaseLineManagementContainer();

export default baseLineManagementContainer.getComponent();
 