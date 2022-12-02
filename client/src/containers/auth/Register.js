import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import swal from "sweetalert";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirmPassword, setFocusConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/v1/auth/signup",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/login");
      swal("Success", "Account created successfully. Now Login.", "success");
    } catch (error) {
      swal("Error Occurred", error.response.data.message, "error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-box">
        <p className="form--header">Create an account</p>
        <p className="tag--name">Register</p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group-auth">
            <i className="fa fa-user icon"></i>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="form-control"
              placeholder="Username"
              autoComplete="off"
              required
              pattern="^[A-Za-z0-9]{3,16}$"
              onBlur={(e) => {
                setFocusName(true);
              }}
              focussed={focusName.toString()}
            />
            <span>
              Username should be 3-16 characters and shouldn't include special
              characters
            </span>
          </div>

          <div className="form-group-auth">
            <i className="fa fa-envelope icon"></i>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              autoComplete="off"
              required
              onBlur={(e) => {
                setFocusEmail(true);
              }}
              focussed={focusEmail.toString()}
            />
            <span>It should be a valid email address</span>
          </div>

          <div className="form-group-auth">
            <i className="fa fa-key icon"></i>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={handleChange}
              autoComplete="new-password"
              required
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
              onBlur={(e) => {
                setFocusPassword(true);
              }}
              focussed={focusPassword.toString()}
            />
            <span>
              Passwordshould be 8-20 characters and include atleast 1 letter 1
              number and 1 special character
            </span>
          </div>

          <div className="form-group-auth">
            <i className="fa fa-key icon"></i>
            <input
              name="passwordConfirm"
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              autoComplete="new-password"
              required
              pattern={values.password}
              onBlur={(e) => {
                setFocusConfirmPassword(true);
              }}
              focussed={focusConfirmPassword.toString()}
            />
            <span>Passwords don't match</span>
          </div>

          <button type="submit" className="btn-login">
            Sign up
          </button>
          <p>
            <Link to="/login">Already have an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
