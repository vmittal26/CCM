
import * as React from "react";

export default function Increment() {

    const [state,setState] = React.useState<number>(0);
    return (
      <div className="Increment"> 
          <h1>Counter is {state}</h1>
          <button onClick={()=>setState(state+1)}>increment</button>
      </div>
    )
  }