import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [requestResponse, setRequestResponse] = useState({
    textMessage: "",
    alertClass: "",
  });
  const initialValues = {
    firstname: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const onSubmit = (values) => {
    axios
      .post("https://fakestoreapi.com/users", values)
      .then(
        (response) => {
          console.log(response.data);
          setRequestResponse({
            textMessage: "Sucessfully Registered, please login to continue",
            alertClass: "alert alert-success",
          });

          // navigate("/login");
        },
        (error) => {
          setRequestResponse({
            textMessage: error.response.data.message,
            alertClass: "alert alert-danger",
          });
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("firstname is required"),
    lastName: Yup.string().required("last name is required"),
    username: Yup.string().required("last name is required"),
    email: Yup.string()
      .required("email is requred")
      .email("email must be valid email adress"),

    password: Yup.string()
      .required("password is required")
      .min(6, "password must be atleast 6 charecters"),
    confirmPassword: Yup.string()
      .label("confirm password")
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <div className=" wrapper">
              <div className={requestResponse.alertClass}>
                {requestResponse.textMessage}
              </div>

              <h2>SignUp</h2>
              <hr />
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="">FirstName</label>
                  <input
                    type="text"
                    name="firstname"
                    value={formik.values.firstname}
                    className={
                      formik.touched.firstname && formik.errors.firstname
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                    <small className="text-danger">
                      {formik.errors.firstname}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">Last Name</label>
                  <input
                    type="text"
                    className={
                      formik.touched.lastName && formik.errors.lastName
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <small className="text-danger">
                      {formik.errors.lastName}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">User Name</label>
                  <input
                    type="text"
                    className={
                      formik.touched.username && formik.errors.username
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <small className="text-danger">
                      {formik.errors.username}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    className={
                      formik.touched.email && formik.errors.email
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <small className="text-danger">{formik.errors.email}</small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formik.values.password}
                    className={
                      formik.touched.password && formik.errors.password
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <small className="text-danger">
                      {formik.errors.password}
                    </small>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="">Confirm Password</label>
                  <input
                    type="password"
                    className={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                        ? "form-control is-invalid"
                        : "form-control"
                    }
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <small className="text-danger">
                      {formik.errors.confirmPassword}
                    </small>
                  ) : null}
                </div>

                <input
                  className="btn btn-primary btn-block"
                  type="submit"
                  value="register"
                  disabled={!formik.isValid}
                />
              </form>
              <br />
              <p className="text-center">
                {" "}
                Already Registerd?<Link to="/login">click here to login</Link>
              </p>
            </div>
          </div>
          <div className="col-md-3"></div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
