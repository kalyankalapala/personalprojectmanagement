import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/userSlice";
import "./nav.css";
const Nav = () => {
  const currentUser = useSelector((state) => state.currentUser);

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await axios.get(
          `http://localhost:8800/api/v1/users/${currentUser._id}`,
          {
            withCredentials: true,
          }
        );
        setImg(currentUser.img);
        setName(currentUser.name);
      } catch (error) {
        dispatch(logout());
        navigate("/login");
      }
    };
    fetchUser();
  }, [dispatch, navigate, currentUser]);
  return (
    <div className="nav--bar">
      <div className="profile-details">
        {img !== undefined ? (
          <img src={img} alt="" />
        ) : (
          <i className="fa fa-user"></i>
        )}

        <p className="profile--name">{name}</p>
      </div>
    </div>
  );
};

export default Nav;
