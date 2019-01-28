import { useEffect } from "react";
import * as React from 'react';

export default (component:any):any=>{

        useEffect(()=>{
                console.log("mounted");
        });

        return component;
}