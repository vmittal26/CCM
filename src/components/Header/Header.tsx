import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <div className="Header-Parent">
      <div className="Header">
        <div className="Header__left">
          <div className="Header__logo-box">
            <img
              className="Header__logo"
              src="./src/images/vodafone_icon.jpg"
              alt="KTM"
            />
          </div>
          <FontAwesomeIcon
            style={{ marginLeft: "0.5rem", fontSize: "1.5rem" }}
            icon="bars"
          />
        </div>
        <div className="Header__right">
          <span>Username</span>
          <span>RoleName</span>
          <FontAwesomeIcon style={{ fontSize: "1.25rem" }} icon="power-off" />
        </div>
      </div>
    </div>
  );
}
