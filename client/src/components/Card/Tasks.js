import React, { useState, useEffect } from "react";
import "./card.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import EditTask from "../../containers/tasks/EditTask";
const Tasks = ({tasks}) => {
    const [openEdit, setOpenEdit] = useState(false);
    const [dep, setDep] = useState({})
    const submit = () => {
        confirmAlert({
          title: "Confirm to delete",
          message: "Are you sure you want to delete?",
          buttons: [
            {
              label: "Yes",
              onClick: async () => {
                try {
                  await axios.delete(
                    `http://localhost:8800/api/v1/tasks/${tasks._id}`,
                    { withCredentials: true }
                  );
                  swal("Deleted", "Project Deleted Successfully", "success");
                  window.location.reload()
                } catch (error) {
                  swal("Error occurred", error.response.data.message, "error");
                }
              },
            },
            {
              label: "No",
            },
          ],
        });
      };
     useEffect(()=>{
      const fetchDepartment = async()=>{
        try {
          const res = await axios.get(`http://localhost:8800/api/v1/departments/getSingle/${tasks.depId}`)
          setDep(res.data)
        } catch (error) {
          
        }
      }
      fetchDepartment()
     },[])
  return (
    <div className="card">
    <div className="card-row">
      <div className="left">Task Name</div>
      <div className="right">{tasks.taskName}</div>
    </div>
    <div className="card-row">
      <div className="left">Description</div>
      <div className="right">{tasks.desc}</div>
    </div>
    <div className="card-row">
      <div className="left">Start Date</div>
      <div className="right">{tasks.startDate}</div>
    </div>
    

    <div className="card-row">
      <div className="left">End Date</div>
      <div className="right">{tasks.endDate}</div>
    </div>
    <div className="card-row">
      <div className="left">Department Name:</div>
      <div className="right">{dep.dName}</div>
    </div>
   
    <div className="card-row">
      <Link
        to={`/maps/${tasks._id}`}
        className="btn btn-small btn-primary"
      >
        <i className="fa fa-tasks"></i>SubTasks
      </Link>
      <button
        onClick={() => {
          setOpenEdit(true);
        }}
        className="btn btn-small btn-success"
      >
        <i className="fa fa-pencil-square-o"></i>Edit
      </button>
      <button onClick={submit} className="btn btn-small btn-danger">
        <i className="fa fa-trash"></i>Delete
      </button>
    </div>
    {openEdit && <EditTask setOpenEdit={setOpenEdit} task={tasks} />}
  </div>
  )
}

export default Tasks