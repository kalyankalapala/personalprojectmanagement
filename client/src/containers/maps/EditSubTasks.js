import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
const EditSubTasks = ({setOpen, subtask}) => {
    const [input, setInput] = useState({});
    const[task, setTask] = useState({})
    const [emps, setEmps] = useState([])
    const pathname = useLocation().pathname.split("/")[2];
    const handleChange = (e) => {
      setInput((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(
          `http://localhost:8800/api/v1/subtask/${subtask._id}`,
          { ...input },
          { withCredentials: true }
        );
        setOpen(false);
        swal("Success", "Sub task updated successfully", "success");
        window.location.reload();
      } catch (error) {
        setOpen(false);
        swal("Error occurred", error.response.data.message, "error");
      }
    };
    //get dep id
    useEffect(()=>{
      const fetchTasks = async()=>{
       try {
        const res = await axios.get(`http://localhost:8800/api/v1/tasks/getSingle/${pathname}`, {withCredentials:true})
        setTask(res.data)
       } catch (error) {
        console.log(error)
       }
      }
      fetchTasks()
    },[pathname])
    useEffect(()=>{
      const fetchEmps = async()=>{
        try {
         const res = await axios.get(`http://localhost:8800/api/v1/employees/getAll/${task.depId}`, {withCredentials:true})
         setEmps(res.data)
        } catch (error) {
         console.log(error)
        }
       }
       fetchEmps()
    },[task])
    //get emp 
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">Add Sub task</div>
            <i onClick={() => setOpen(false)} className="fa fa-close"></i>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="">*Name</label>
                <input
                  type="text"
                  name="subtaskTitle"
                  onChange={handleChange}
                  required
                  defaultValue={subtask.subtaskTitle}
                />
                <span>Field cannot be empty</span>
              </div>
  
              <div className="form-group">
                <label htmlFor="">*Description</label>
                <textarea
                  rows={3}
                  name="subtaskDesc"
                  onChange={handleChange}
                  required
                  defaultValue={subtask.subtaskDesc}
                ></textarea>
                <span>Description cannot be empty</span>
              </div>
              <div className="form-group">
                <label htmlFor="">*Date</label>
                <input type="date" defaultValue={subtask.date}  name="date" onChange={handleChange} required />
                <span>Date cannot be empty</span>
              </div>
  
              <div className="form-group">
                <label htmlFor="">*Time</label>
                <input type="time" defaultValue={subtask.time} name="time" onChange={handleChange} required />
                <span>Time cannot be empty</span>
              </div>
              <div className="form-group">
                <select name="empId" onChange={handleChange} >
                  <option value="">Select employee</option>
                  {emps?emps.map((emp)=>(
                    <option value={emp._id}>{emp.empName}</option>
                  )):<option>No Employer Found</option>}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button onClick={handleSubmit} className="btn btn-medium btn-success">
              Update
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
}

export default EditSubTasks