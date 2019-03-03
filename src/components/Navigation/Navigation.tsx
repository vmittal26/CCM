import * as React from "react";
import BaseComponent from "../BaseComponent/BaseComponent";
import { Breadcrumb } from "antd";
import "antd/lib/breadcrumb/style/index.css";
import IBreadCrumbItem from "../../model/IBreadCrumbItem";
import { Link } from "react-router-dom";

class NavigationContainer extends BaseComponent {
  private breadCrumbItems: Array<IBreadCrumbItem> = [];
  private setBreadCrumbItems: Function;

  constructor() {
    super();
  }

  public onNavigation = (breadCrumbItems:IBreadCrumbItem[]) => {
      
    // let homeItem = this.breadCrumbItems.filter(breadCrumbItem=>breadCrumbItem.breadCrumbName==="Home");

      if(breadCrumbItems.length===1 && breadCrumbItems[0].breadCrumbName==="Home"){
        this.setBreadCrumbItems([{...breadCrumbItems[0]}]);
      }else{
        this.setBreadCrumbItems([...breadCrumbItems]);
      }
  };
  public navigationController = (props: any): JSX.Element => {
    const [breadCrumbItems, setBreadCrumbItems] = React.useState< Array<IBreadCrumbItem> >([]);

    this.breadCrumbItems = breadCrumbItems;
    this.setBreadCrumbItems = setBreadCrumbItems;


    React.useEffect(() => {
      this.EE.on("onNavigation", this.onNavigation);
      return () => {

        this.EE.removeListener("onNavigation", this.onNavigation);
      };
    }, []);
    return (
      <div className="Navigation">
        <Breadcrumb>
          {breadCrumbItems.map(breadCrumbItem => (
            <Breadcrumb.Item key={breadCrumbItem.breadCrumbName}>
              {breadCrumbItem.breadCrumbLink?(<Link to={breadCrumbItem.breadCrumbLink}>
                {breadCrumbItem.breadCrumbName}
              </Link>):breadCrumbItem.breadCrumbName}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    );
  };
  public getComponent(): React.FunctionComponent {
    return this.navigationController;
  }
}

export const navigationContainer = new NavigationContainer();

export default navigationContainer.getComponent();
