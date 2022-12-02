import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
const AddTasks = ({setOpen}) => {
    const [input, setInput] = useState({});
    const pid = useLocation().pathname.split("/")[2];
    const [deps, setDeps] = useState([])
    const handleChange = (e) => {
      setInput((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    useEffect(()=>{
        const fetchDeps = async()=>{
           try {
            const res = await axios.get("http://localhost:8800/api/v1/departments/getAll", {withCredentials:true})
            setDeps(res.data);
           } catch (error) {
            
           }
        }
        fetchDeps()
    },[])
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          `http://localhost:8800/api/v1/tasks/${pid}`,
          { ...input },
          { withCredentials: true }
        );
        setOpen(false);
        swal("Success", "Task Added successfully", "success");
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
        <div className="modal-title">Add Task</div>
        <i onClick={() => setOpen(false)} className="fa fa-close"></i>
      </div>
      <div className="modal-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="">*Name</label>
            <input
              type="text"
              name="taskName"
              onChange={handleChange}
              required
            />
            <span>Name cannot be empty</span>
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
            <label htmlFor="">*Start Date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              required
            />
            <span>Date cannot be empty</span>
          </div>
          <div className="form-group">
            <label htmlFor="">*End Date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              required
            />
            <span>Date cannot be empty</span>
          </div>
          <div className="form-group" >
            <select name="depId" id="" onChange={handleChange}>
            <option value="">Select Department</option>
                {deps?deps.map((dep)=>(
                     <option value={dep._id}>{dep.dName}</option>
                )):<option>No Department found</option>}
                
            </select>
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
  )
}

export default AddTasks