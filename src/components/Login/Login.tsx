import * as React from 'react';
import { Formik, Field } from 'formik';
import EE from "../../EventEmitter";
import ReactSVG from 'react-svg';

export default function Login(loginProps:any) {
 
  React.useEffect(()=>{
      // setTimeout(()=>{
      //     EE.emit("onSucessFullAuthentication",true);
      // },2000);
  },[]);


  return (
    <div className="Login">
          <div className="Login__Header">
            {/* <ReactSVG src="../../src/images/ericssonLogo_blue.svg" /> */}
          </div>
          <div className="Login__FormContainer">
          <h2 className="mb-4">Central Configuration Management</h2>
          <Formik
            enableReinitialize
            initialValues={{"username":"","password":""}}
            onSubmit={loginProps.onSubmit}
            children={(props:any) => 
               (<form className="Login__Form">
                 <Field type="text" name="username" className="form-control" placeholder="User Name" />
                 <Field type="password" name="password" className="form-control" placeholder="Password" />
                <button type="submit" className="btn btn-primary ml-1" onClick={()=> EE.emit("onSucessFullAuthentication",true)}> Login </button>
               </form>)
              }
          />
          </div>
    </div>
  )
}


