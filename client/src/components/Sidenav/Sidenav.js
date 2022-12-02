import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "../topnav/Nav";
import "./sidenav.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";
const Sidenav = () => {
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <>
      <div
        onClick={() => {
          setMenuState(!menuState);
        }}
        id="menu-bars"
        className={menuState ? "fa fa-times" : "fa fa-bars"}
      ></div>

      <header
        className={menuState ? "header-dashboard active" : "header-dashboard"}
      >
        <Link to="#" className="logo">
          <span>Project</span>Manager
        </Link>
        <nav className="navbar">
          <Link className={`${pathname === "/" ? "active" : "link"}`} to="/">
            Projects
          </Link>
          
          <Link className={`${pathname === "/departments"|| pathname ==="/employees" ? "active" : "link"}`} to="/departments">
            Departments
          </Link>
          <Link
            className={`${pathname === "/profile" ? "active" : "link"}`}
            to="/profile"
          >
            Profile
          </Link>

          <p onClick={handleLogout}>Logout</p>
        </nav>
        <div className="follow"></div>
      </header>
      <Nav />
      <Outlet />
    </>
  );
};

export default Sidenav;
