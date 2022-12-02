import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
const EditTask = ({setOpenEdit, task}) => {
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
        await axios.put(
          `http://localhost:8800/api/v1/tasks/${task._id}`,
          { ...input },
          { withCredentials: true }
        );
        setOpenEdit(false);
        swal("Success", "Task Added successfully", "success");
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
        <div className="modal-title">Update Task</div>
        <i onClick={() => setOpenEdit(false)} className="fa fa-close"></i>
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
              defaultValue={task.taskName}
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
              defaultValue={task.desc}
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
              defaultValue={task.startDate}
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
              defaultValue={task.endDate}
            />
            <span>Date cannot be empty</span>
          </div>
          <div className="form-group" >
            <select  name="depId" id="">
            <option value="">Select Department</option>
                {deps?deps.map((dep)=>(
                     <option value={dep._id}>{dep.dName}</option>
                )):<option>No Department found</option>}
                
            </select>
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

export default EditTask