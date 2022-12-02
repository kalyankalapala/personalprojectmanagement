import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
const AddDepartments = ({setOpen}) => {
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
          `http://localhost:8800/api/v1/departments`,
          { ...input },
          { withCredentials: true }
        );
        setOpen(false);
        swal("Success", "Department Added successfully", "success");
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
        <div className="modal-title">Add Departments</div>
        <i onClick={() => setOpen(false)} className="fa fa-close"></i>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">*Name</label>
            <input
              type="text"
              name="dName"
              onChange={handleChange}
              required
            />
            <span>Name cannot be empty</span>
          </div>
         
          <div className="form-group">
            <label htmlFor="">*Role</label>
            <input
              type="text"
              name="role"
              onChange={handleChange}
              required
            />
            <span>Role cannot be empty</span>
          </div>
       
          <div className="form-group">
            <label htmlFor="">Head of Department</label>
            <input
              type="text"
              name="dHead"
              onChange={handleChange}
              required
            />
            <span>HOD field is required</span>
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
  )
}

export default AddDepartments