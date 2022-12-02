import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import TaskCard from "../../components/Card/TaskCard";
import Loader from "../../components/Loader";
import image from "../../images/image2.png";
import AddTasks from "./AddTasks";
import "./map.css";
const Map = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = useLocation().pathname.split("/")[2];
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8800/api/v1/tasks/getSingle/${pathname}`,
          { withCredentials: true }
        );
        setProject(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        swal("Error", "Error fetching project", "error");
      }
    };
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8800/api/v1/subtask/all/${pathname}`,
          { withCredentials: true }
        );
        setTasks(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        swal("Error", "Error fetching project", "error");
      }
    };
    fetchProject();
    fetchTasks();
  }, [pathname]);
  return (
    <section>
      <h3 className="heading center">Sub Tasks</h3>
      {loading ? (
        <Loader />
      ) : (
        <div className="project">
          {project.img ? (
            <img src={project.img} alt="" />
          ) : (
            <img src={image} alt="" />
          )}
          <div className="details">
            <h3>{project.taskName}</h3>
            <p>{project.desc}</p>
          </div>
        </div>
      )}
      <div className="top-helpers">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-medium"
        >
          Add sub Task
        </button>
      </div>
      {tasks.length < 1 && <div className="middle">No Subtasks Found</div>}
      {loading ? (
        <Loader />
      ) : (
        <div className="container-tasks">
          {tasks.map((task) => (
            <TaskCard key={task._id} tasks={task} />
          ))}
        </div>
      )}

      {open && <AddTasks setOpen={setOpen} />}
    </section>
  );
};

export default Map;
