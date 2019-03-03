import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import { ISliderProps } from "../../../model/ISlideprops";
import Collapsible from "react-collapsible";
import menuConfig from "../../../config/menuConfig";
import EE from "../../../EventEmitter";
import BaseComponent from "../../BaseComponent/BaseComponent";


class SliderMenuContainer extends BaseComponent{

  private setShow:Function;
  private show:boolean=false;

  constructor(){
    super();
    this.EE.on("onToggleSlider",this.onToggleSlider);
    this.EE.on("onHideSlider",this.onHideSlider);
  }
   onToggleSlider=()=>{
      this.show = !this.show;
      this.setShow(this.show);
   }

   onHideSlider=()=>{
     console.log("on hide");
    this.show=false;
    this.setShow(this.show);
   }

   public getComponent():React.FunctionComponent<ISliderProps>{
    return this.sliderMenu;
    }
  
    public sliderMenu=(props: ISliderProps):JSX.Element=>{
      const [show , setShow] = React.useState(this.show);

      this.setShow = setShow;
    
      const classToggle = show ? "SliderMenu SliderMenu__Open" : " SliderMenu SliderMenu__Close";
    
      let slider = Object.keys(menuConfig).map((element: any) => {
      console.log(menuConfig[element].caption);
        return (
          <Collapsible key={menuConfig[element].caption} trigger={menuConfig[element].caption} open>
            <ul className="SliderMenuList">
              {menuConfig[element].subMenu.map((e: any) => (
                <li key={e.link}className="SliderMenuList__item">
                  <Link to={e.link}>{e.caption}</Link>
                </li>
              ))}
            </ul>
          </Collapsible>
        );
      });
    
      React.useEffect(()=>{
     
        return () => {
          console.log("removing onToggleSlider Listener on unmount");
          EE.removeListener("onToggleSlider",this.onToggleSlider);
          EE.removeListener("onHideSlider",this.onHideSlider);
        };
      },[]);
    
      return (
        <>
          {/* <Backdrop show={props.show} onClick={props.onClick} /> */}
          <div className={classToggle + " text-dark"}>{slider}</div>
        </>
      );
    }
}
const sliderMenuContainer = new SliderMenuContainer();

export default sliderMenuContainer.getComponent();