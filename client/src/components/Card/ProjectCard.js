import React, { useState, useEffect } from "react";
import "./card.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import EditProject from "../../containers/dashboard/EditProject";
const ProjectCard = ({ projects }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
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
  const fetchMaps = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/v1/maps/allMaps/${projects._id}`,
        { withCredentials: true }
      );
      setTasks(res.data);
    } catch (error) {
      swal("Error", "Error fetching project", "error");
    }
  };
  const fetchCompletedMaps = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8800/api/v1/maps/completed/${projects._id}`,
        { withCredentials: true }
      );
      setCompleted(res.data);
    } catch (error) {
      swal("Error", "Error fetching project", "error");
    }
  };
  useEffect(() => {
    fetchMaps();
    fetchCompletedMaps();
  }, [projects]);
  const percent = (completed.length / tasks.length) * 100;
  return (
    <div className="card">
      <div className="card-row">
        <div className="left">Project Name</div>
        <div className="right">{projects.projectName}</div>
      </div>
      <div className="card-row">
        <div className="left">Started on</div>
        <div className="right">{projects.startDate}</div>
      </div>
      <div className="card-row">
        <div className="left">Completion</div>
        <div className="right">{projects.endDate}</div>
      </div>
      <div className="card-row">
        <div className="left">Percetage completed</div>
        <div className="right">{percent}%</div>
      </div>

      <div className="card-row">
        <div className="left">Project budget</div>
        <div className="right">$.{projects.cost}</div>
      </div>
      <div className="card-row">
        <Link
          to={`/maps/${projects._id}`}
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
  );
};

export default ProjectCard;
