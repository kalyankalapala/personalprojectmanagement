import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
const AddEmployees = ({setOpen}) => {
    const [input, setInput] = useState({});
    const depId = useLocation().pathname.split("/")[2];
    const handleChange = (e) => {
      setInput((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `http://localhost:8800/api/v1/employees/${depId}`,
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
        <div className="modal-title">Add Employees</div>
        <i onClick={() => setOpen(false)} className="fa fa-close"></i>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">*Name</label>
            <input
              type="text"
              name="empName"
              onChange={handleChange}
              required
            />
            <span>Field cannot be empty</span>
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
            <label htmlFor="">*Salary</label>
            <input
              type="number"
              name="salary"
              onChange={handleChange}
              required
            />
            <span>Salary field is required</span>
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

export default AddEmployees