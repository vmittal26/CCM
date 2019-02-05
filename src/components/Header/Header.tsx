import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliderMenu from "../UI/SliderMenu/SliderMenu";
import { withRouter } from "react-router";
import SwitchMode from "../UI/SwitchMode/SwitchMode";
import deviceCheckConfig from "../../config/deviceCheckConfig";
import { Icon } from "antd";


export  function Header(props:any) {
  const [isHidden, setIsHidden] = React.useState<boolean>(false);
  const onToogleSliderMenu = () => setIsHidden(!isHidden);

  return (
    <div className="Header">
      <div className="Header__left">
        <div className="Header__logo-box" onClick={()=>{props.history.replace("/")}}>
          <img
            className="Header__logo"
            src="./src/images/vodafone-logo.png"
            alt="KTM"
          />
        </div>
        <h2 className={"ml-3 mt-2"}>KTM</h2>
        {/* <button  className="btn" onClick={() => onToogleSliderMenu()}> */}
        <Icon className="Header__left__baricon" onClick={() => onToogleSliderMenu()} type="bars" ></Icon>
          {/* <FontAwesomeIcon
            style={{ marginLeft: "0.5rem", fontSize: "2rem" }}
            icon="bars"
          /> */}
        {/* </button> */}
      </div>
      <div className="Header__right">
        {/* <span>Username</span>
        <span>RoleName</span> */}
        <SwitchMode isMobileView={deviceCheckConfig() ? true : false}/>
        <Icon className="Header__right__poweroff"type="poweroff"></Icon>
        {/* <FontAwesomeIcon style={{ fontSize: "1.25rem" }} icon="power-off" /> */}
      </div>
      <SliderMenu show={isHidden} onClick={onToogleSliderMenu} />
    </div>
  );
}

export default withRouter(Header);