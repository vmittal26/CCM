import * as React from "react";
import { Link ,withRouter} from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import { ISliderProps } from "../../../model/ISlideprops";

export default function SliderMenu(props: ISliderProps) {
  const classToggle = props.show ? "SliderMenu SliderMenu__Open" : " SliderMenu SliderMenu__Close";
  return (
    <>
      <Backdrop show={props.show} onClick={props.onClick} />
      <div className={classToggle + " text-dark"}>
        <ul className="list-group">
          <li className="list-group-item"><Link to="/">Home</Link></li>
          <li className="list-group-item"><Link to="/gestioneKO">GestioneKO</Link></li>
          <li className="list-group-item"><Link to="/gestioneKOSospesi">GestioneKOSospesi</Link></li>
          <li className="list-group-item"><Link to="/gestioneKOSegnalazione">GestioneKOSegnalazione</Link></li>
          <li className="list-group-item"><Link to="/sospensioniVodafone">SospensioniVodafone</Link></li>
        </ul>
      </div>
    </>
  );
}
