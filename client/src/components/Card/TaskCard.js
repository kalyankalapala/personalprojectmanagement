import axios from "axios";
import React, { useState, useEffect } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./card.css";
import swal from "sweetalert";
import EditSubTasks from "../../containers/maps/EditSubTasks";
const TaskCard = ({ tasks }) => {
  const [open, setOpen] = useState(false);
  const [emp, setEmp] = useState({})
  let status = "";
  if (tasks.status === "uncompleted") {
    status = "completed";
  } else {
    status = "uncompleted";
  }
  const updateStatus = async () => {
    await axios.put(
      `http://localhost:8800/api/v1/subtask/${tasks._id}`,
      { status: status },
      { withCredentials: true }
    );
    window.location.reload();
  };
  const submit = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the task?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              await axios.delete(
                `http://localhost:8800/api/v1/subtask/${tasks._id}`,
                { withCredentials: true }
              );
              swal("Deleted", "Task Deleted Successfully", "success");
              window.location.reload();
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
    const fetchEmp = async()=>{
      try {
        const res = await axios.get(`http://localhost:8800/api/v1/employees/getSingle/${tasks.empId}`)
        setEmp(res.data)
      } catch (error) {
        
      }
    }
    fetchEmp()
  },[])
  return (
    <div className="task-card">
      <h3 className="task-title">{tasks.subtaskTitle}</h3>
      <p className="task-desc">{tasks.subtaskDesc}</p>
      <p className="time">
        Completion: <span>on <b>{tasks.date}</b> at <b>{tasks.time}</b></span>
      </p>
      <br />
      <p className="time">
        Employee Name: <span>{emp.empName}</span>
      </p>

      <div className="card-row">
        <button onClick={updateStatus} className="btn btn-small btn-primary">
          {tasks.status}
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-small btn-success"
        >
          Edit
        </button>
        <button onClick={submit} className="btn btn-small btn-danger">
          Delete
        </button>
      </div>
      {open && <EditSubTasks setOpen={setOpen} subtask={tasks} />}
    </div>
  );
};

export default TaskCard;
