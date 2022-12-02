import React, { useEffect, useState } from "react";
import "./tasks.css"
import axios from "axios";
import Loader from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import Project from "../../components/Card/Project";
import AddTasks from "./AddTasks";
import Tasks from "../../components/Card/Tasks";
const TaskView = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const pid = useLocation().pathname.split("/")[2]
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8800/api/v1/tasks/getAll/${pid}`,
          {
            withCredentials: true,
          }
        );
        setData(data);
        console.log(data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    useEffect(() => {
      getData();
    }, []);
  return (
    <section>
      <h3 className="heading center">Tasks</h3>
      <div className="top-helpers">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-medium"
        >
          Add task
        </button>

        
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="content-dash">
          {" "}
          {data.map((task) => (
            <Tasks key={task._id} tasks={task} />
          ))}
        </div>
      )}

      {open && <AddTasks setOpen={setOpen} />}
    </section>
  )
}

export default TaskView