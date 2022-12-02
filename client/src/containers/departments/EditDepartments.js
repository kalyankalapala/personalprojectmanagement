import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";
const EditDepartments = ({setOpenEdit, department}) => {
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
          `http://localhost:8800/api/v1/departments/${department._id}`,
          { ...input },
          { withCredentials: true }
        );
        setOpenEdit(false);
        swal("Success", "Department Added successfully", "success");
        window.location.reload();
      } catch (error) {
        setOpenEdit(false);
        swal("Error occurred", error.response, "error");
      }
    };
  return (
    <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <div className="modal-title">Update Departments</div>
        <i onClick={() => setOpenEdit(false)} className="fa fa-close"></i>
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
              defaultValue={department.dName}
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
              defaultValue={department.role}
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
              defaultValue={department.dHead}
            />
            <span>HOD field is required</span>
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

export default EditDepartments