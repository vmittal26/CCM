import * as React from "react";

export default (props: any) =>
  props.show ? (
    <div className="Backdrop" onClick={props.onClick} />
  ) : null;
