import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import { ISliderProps } from "../../../model/ISlideprops";
import Collapsible from "react-collapsible";
import menuConfig from "../../../config/menuConfig";

export default function SliderMenu(props: ISliderProps) {
  const classToggle = props.show ? "SliderMenu SliderMenu__Open" : " SliderMenu SliderMenu__Close";

  let slider = Object.keys(menuConfig).map((element: any) => {
    return (
      <Collapsible key={element} trigger={element} open>
        <ul className="SliderMenuList">
          {menuConfig[element].map((e: any) => (
            <li key={e.link}className="SliderMenuList__item">
              <Link to={e.link}>{e.caption}</Link>
            </li>
          ))}
        </ul>
      </Collapsible>
    );
  });

  return (
    <>
      <Backdrop show={props.show} onClick={props.onClick} />
      <div className={classToggle + " text-dark"}>{slider}</div>
    </>
  );
}
