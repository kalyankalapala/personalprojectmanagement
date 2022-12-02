import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userSlice";
import Loader from "../../components/Loader";

const Login = () => {
  const [input, setInput] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [focusName, setFocusName] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const status = useSelector((state) => state.loading);
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    setLoading(status);
    try {
      const res = await axios.post(
        "http://localhost:8800/api/v1/auth/signin",
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(loginSuccess(res.data));
      setLoading(status);
      navigate("/");
      swal("Success", `Welcome ${res.data.name}`, "success");
    } catch (error) {
      swal("Error Occurred", error.response.data.message, "error");
      dispatch(loginFailure());
      setLoading(status);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-box">
        <p className="form--header">Welcome Back</p>
        <p className="tag--name">Login to project tracker</p>

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
              onBlur={(e) => {
                setFocusName(true);
              }}
              focussed={focusName.toString()}
              required
            />
            <span>Username is required</span>
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
              onBlur={(e) => {
                setFocusPassword(true);
              }}
              focussed={focusPassword.toString()}
              required
            />
            <span>Password is required</span>
          </div>
          <button type="submit" className="btn-login">
            Sign in
          </button>
          {loading && <Loader />}
          <p>
            <Link to="/register">Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
