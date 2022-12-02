import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import "./dashboard.css";
const AddProject = ({ setOpen }) => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/v1/projects/",
        { ...input },
        { withCredentials: true }
      );
      setOpen(false);
      swal("Success", "Project Added successfully", "success");
      window.location.reload();
    } catch (error) {
      setOpen(false);
      swal("Error occurred", error.response.data.message, "error");
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Add project</div>
          <i onClick={() => setOpen(false)} className="fa fa-close"></i>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="">*Name</label>
              <input
                type="text"
                name="projName"
                onChange={handleChange}
                required
              />
              <span>Field cannot be empty</span>
            </div>
           
            <div className="form-group">
              <label htmlFor="">*Description</label>
              <textarea
                rows={3}
                name="desc"
                onChange={handleChange}
                required
              ></textarea>
              <span>Description cannot be empty</span>
            </div>
            <div className="form-group">
              <label htmlFor="">*Github Repo</label>
              <input
                type="text"
                name="githubRepo"
                onChange={handleChange}
                required
              />
              <span>Github repo field is required</span>
            </div>
            <div className="form-group">
              <label htmlFor="">*Cost</label>
              <input
                type="number"
                name="cost"
                onChange={handleChange}
                required
              />
              <span>Cost field is required</span>
            </div>
           
          
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} className="btn btn-medium btn-success">
            Add
          </button>
          <button
            onClick={() => setOpen(false)}
            className="btn btn-medium btn-danger"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
