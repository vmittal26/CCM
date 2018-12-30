import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SliderMenu from "../UI/SliderMenu/SliderMenu";

export default function Header() {
  const [isHidden, setIsHidden] = React.useState<boolean>(false);
  const onToogleSliderMenu = () => setIsHidden(!isHidden);

  return (
    <div className="Header">
      <SliderMenu show={isHidden} onClick={onToogleSliderMenu} />

      <div className="Header__left">
        <div className="Header__logo-box">
          <img
            className="Header__logo"
            src="./src/images/vodafone_icon.jpg"
            alt="KTM"
          />
        </div>
        <button  className="btn text-white" onClick={() => onToogleSliderMenu()}>
          <FontAwesomeIcon
            style={{ marginLeft: "0.5rem", fontSize: "2rem" }}
            icon="bars"
          />
        </button>
      </div>
      <div className="Header__right">
        <span>Username</span>
        <span>RoleName</span>
        <FontAwesomeIcon style={{ fontSize: "1.25rem" }} icon="power-off" />
      </div>
    </div>
  );
}
