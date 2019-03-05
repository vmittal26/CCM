import * as React from 'react';
import { Formik, Field } from 'formik';
import EE from "../../EventEmitter";

export default function Login(loginProps:any) {
 
  React.useEffect(()=>{
      // setTimeout(()=>{
      //     EE.emit("onSucessFullAuthentication",true);
      // },2000);
  },[]);


  return (
    <div className="Login">
          <div className="Login__Header">
            <h2>Central Configuration Management</h2>
          </div>
          <div className="Login__formContainer">
          <Formik
            enableReinitialize
            initialValues={{"username":"","password":""}}
            onSubmit={loginProps.onSubmit}
            children={(props:any) => 
               (<form className="Login__form">
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


