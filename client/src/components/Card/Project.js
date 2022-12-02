import React, { useState, useEffect } from "react";
import "./card.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import EditProject from "../../containers/dashboard/EditProject";
const Project = ({projects}) => {
    const [openEdit, setOpenEdit] = useState(false);
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
                    `http://localhost:8800/api/v1/projects/${projects._id}`,
                    { withCredentials: true }
                  );
                  swal("Deleted", "Project Deleted Successfully", "success");
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
     
  return (
    <div className="card">
    <div className="card-row">
      <div className="left">Project Name</div>
      <div className="right">{projects.projName}</div>
    </div>
    <div className="card-row">
      <div className="left">Description</div>
      <div className="right">{projects.desc}</div>
    </div>
    <div className="card-row">
      <div className="left">Github Repo</div>
      <div className="right">{projects.githubRepo}</div>
    </div>
    

    <div className="card-row">
      <div className="left">Project Cost</div>
      <div className="right">$.{projects.cost}</div>
    </div>
    <div className="card-row">
      <Link
        to={`/tasks/${projects._id}`}
        className="btn btn-small btn-primary"
      >
        <i className="fa fa-tasks"></i>Tasks
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
    {openEdit && <EditProject setOpenEdit={setOpenEdit} project={projects} />}
  </div>
  )
}

export default Project