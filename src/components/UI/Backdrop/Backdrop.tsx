import * as React from "react";

export default (props: any) =>
  props.show ? ( <div className={props.iswhite && props.iswhite ? "Backdrop Backdrop--white":"Backdrop"} onClick={props.onClick} /> ) : null;
