import * as React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { ISliderProps } from "../../../model/ISlideprops";

export default function SliderMenu(props: ISliderProps) {
  const classToggle = props.show ? "SliderMenu SliderMenu__Open" : " SliderMenu SliderMenu__Close";
  return (
    <>
      <Backdrop show={props.show} onClick={props.onClick} />
      <div className={classToggle + " text-dark"}>
        <ul className="list-group">
          <li className="list-group-item">Gestione KO</li>
          <li className="list-group-item">Gestione KO Sospesi</li>
          <li className="list-group-item">Gestione KO Segnalazione</li>
          <li className="list-group-item">Sospensioni Vodafone</li>
        </ul>
      </div>
    </>
  );
}
