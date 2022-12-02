import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TaskCard from "../../components/Card/TaskCard";
import Loader from "../../components/Loader";
import image from "../../images/image2.png";
import AddTasks from "./AddTasks";
import "./map.css";
const SearchResultsMap = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = useLocation().pathname.split("/")[2];
  const query = useLocation().search;
  const [project, setProject] = useState({});
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8800/api/v1/projects/getSingle/${pathname}`,
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
        `http://localhost:8800/api/v1/maps/allMaps/${pathname}/search${query}`,
        { withCredentials: true }
      );
      setTasks(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      swal("Error", "Error fetching project", "error");
    }
  };
  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [pathname]);
  return (
    <section>
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
            <h3>{project.projectName}</h3>
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
          Add Task
        </button>

        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
          />
          <button
            onClick={() => navigate(`/search?q=${searchQuery}`)}
            className="btn btn-medium"
          >
            Search
          </button>
        </div>
      </div>
      {tasks.length < 1 && <div className="middle">No Task Found</div>}
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

export default SearchResultsMap;
