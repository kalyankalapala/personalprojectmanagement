import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
import "./dashboard.css";
const EditProject = ({ setOpenEdit, project }) => {
  const [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8800/api/v1/projects/${project._id}`,
        { ...input },
        { withCredentials: true }
      );
      setOpenEdit(false);
      swal("Success", "Project Updated successfully", "success");
    } catch (error) {
      setOpenEdit(false);
      swal("Error occurred", error.response.data.message, "error");
    }
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title">Edit project</div>
          <i onClick={() => setOpenEdit(false)} className="fa fa-close"></i>
        </div>
        <div className="modal-body">
          <p>Note: Edit the field you want to update</p>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="">*Name</label>
              <input
                type="text"
                name="projName"
                onChange={handleChange}
                required
                defaultValue={project.projName}
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
                defaultValue={project.desc}
              ></textarea>
              <span>Description cannot be empty</span>
            </div>
            <div className="form-group">
              <label htmlFor="">*Github Repo</label>
              <input
                type="text"
                name="githubRepo"
                onChange={handleChange}
                defaultValue={project.githubRepo}
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
                defaultValue={project.cost}
                required
              />
              <span>Cost field is required</span>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button onClick={handleSubmit} className="btn btn-medium btn-success">
            Update
          </button>
          <button
            onClick={() => setOpenEdit(false)}
            className="btn btn-medium btn-danger"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProject;
