import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
const EditEmployee = ({setOpenEdit, employee}) => {
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
        await axios.put(
          `http://localhost:8800/api/v1/employees/${employee._id}`,
          { ...input },
          { withCredentials: true }
        );
        setOpenEdit(false);
        swal("Success", "Project updated successfully", "success");
        window.location.reload();
      } catch (error) {
        setOpenEdit(false);
        swal("Error occurred", error.response.data.message, "error");
      }
    };
  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title">Update Employees</div>
        <i onClick={() => setOpenEdit(false)} className="fa fa-close"></i>
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
              defaultValue={employee.empName}
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
              defaultValue={employee.role}
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
              defaultValue={employee.salary}
            />
            <span>Salary field is required</span>
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
  )
}

export default EditEmployee