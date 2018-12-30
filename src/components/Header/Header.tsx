import * as React from "react";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header__left">
        <div className="Header__logo-box">
          <img
            className="Header__logo"
            src="./src/images/vodafone_icon.jpg"
            alt="KTM"
          />
        </div>
      </div>
      <div className="Header__right">
        <span>Username</span>
        <span>RoleName</span>
        <button><i className="fas fa-sign-out-alt"></i></button>
      </div>
    </div>
  );
}
