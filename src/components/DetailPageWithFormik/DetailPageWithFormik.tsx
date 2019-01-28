import * as React from "react";

import { withFormik, Form, Field, setNestedObjectValues } from "formik";
import TextInputField from "../UI/TextInputField/TextInputField";
import { DatePicker } from "antd";
import * as moment from "moment";

function DetailPageWithFormik(props: any) {
  const { errors, touched, values, setFieldValue ,setValues } = props;
  console.log(props);
  const errorClassName = "text-left text-danger text-uppercase";
  return (
    <Form>
      <div>
        {touched.name && errors.name && (
          <div className={errorClassName}>{errors.name}</div>
        )}
        <DatePicker
          onChange={value => {setFieldValue("dataApertura",value);setValues({...values,dataApertura:value})}}
          defaultValue={values.dataApertura}
        />
      </div>
      <div>
        {touched.email && errors.email && (
          <div className={errorClassName}>{errors.email}</div>
        )}
        <Field
          id="email"
          caption="Email"
          name="email"
          placeholder="Email"
          component={TextInputField}
        />
      </div>
      <button type="submit" className="button-primary mt-1">
        {" "}
        Order{" "}
      </button>
    </Form>
  );
}

export default withFormik({
  mapPropsToValues() {
    return {
      dataApertura: moment("2015-06-06"),
      email: "email"
    };
  },

  handleSubmit(values) {
    console.log(values);
  }
})(DetailPageWithFormik);
