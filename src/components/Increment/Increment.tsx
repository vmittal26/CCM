import * as React from "react";

export default function Increment() {
  const [state, setState] = React.useState<number>(0);

  const containerClasses:string = "d-flex justify-content-center align-items-center Increment";
  return (
    <div className={containerClasses}>
      <h2>Counter is {state}</h2>
      <button
        className="btn btn-lg text-uppercase btn-outline-info ml-4"
        onClick={() => setState(state + 1)}
      >
        increment
      </button>
    </div>
  );
}
