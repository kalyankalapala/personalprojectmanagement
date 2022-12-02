import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import { updateProfile } from "../../redux/userSlice";
import "./profile.css";
const Profile = () => {
  const [input, setInput] = useState({});
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:8800/api/v1/users/updateAccount/${currentUser._id}`,
        {
          ...input,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      dispatch(updateProfile(res.data));
    } catch (error) {
      swal("Error occurred", error.response.data.message, "error");
    }
  };

  return (
    <section>
      <div className="form-profile">
        <form onSubmit={handleSubmit}>
          <p>Edit the field you want to change only and update it</p>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              defaultValue={currentUser.name}
            />
            <span>User name should be 3 to 16 characters</span>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="Email"
              name="email"
              onChange={handleChange}
              defaultValue={currentUser.email}
            />
            <span>Input a valid email</span>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} />
            <span>Input a valid password</span>
          </div>
          <div className="form-group">
            <label htmlFor="avatr">Image/Avatar link</label>
            <input
              type="text"
              name="img"
              onChange={handleChange}
              defaultValue={currentUser.img}
            />
          </div>
          <button type="submit" className="btn btn-medium">
            Update account
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
