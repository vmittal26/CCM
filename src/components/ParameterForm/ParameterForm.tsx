import * as React from "react";
import { Formik, Field } from "formik";
import { Col, Row } from "antd";
import * as Yup from "yup";

let initialValues={ parmeterBaseLineId:"", parameterName: "" , parameterValue:"" , parameterDescription:""};
export default (props: any) => {
  return (
    <div className="ParameterForm">
      <Formik
        // /enableReinitialize
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object().shape({
                    parameterName: Yup.string().required("Plese Enter Parameter Name"),
                    parameterValue:Yup.string().required('Please Enter Parameter Value')
        })}
        render={({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          errors,
          isSubmitting,
          touched
        }) => (
           
            <form onSubmit={handleSubmit}>
             <Row gutter={16} >
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                <label className="mandatory-label" htmlFor="parameterName">Parameter Name </label>
                {touched.parameterName && errors.parameterName && <div >{<span className="text-danger">{errors.parameterName}</span>}</div>}
                <Field  type="text"
                        // style={{borderLeft:"5px inset red"}}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.parameterName}
                        name="parameterName"
                        className="form-control"/>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                <label htmlFor="parameterValue">Parameter Value</label>
                {touched.parameterValue && errors.parameterValue && <div >{<span className="text-danger">{errors.parameterValue}</span>}</div>}
                <Field
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.parameterValue}
                        name="parameterValue"
                        className="form-control"/>
                </Col>
                <Col xl={24} lg={24} md={6} sm={8} xs={24}>
                <label htmlFor="parameterDescription">Parameter Description</label>
                <Field
                        component={"textarea"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.parameterDescription}
                        name="parameterDescription"
                        className="form-control"/>
                </Col>
                </Row>
            <div style={{textAlign:"center"}}>
              <button type="submit" disabled={isSubmitting}className="btn btn-primary mt-1"> Edit </button>
            </div>
            </form>
       
        )}
      />
    </div>
  );
};
