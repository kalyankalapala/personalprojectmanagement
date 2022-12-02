import React, { useEffect, useState } from "react";
import ProjectCard from "../../components/Card/ProjectCard";
import "./dashboard.css";
import AddProject from "./AddProject";
import axios from "axios";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import Project from "../../components/Card/Project";
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:8800/api/v1/projects/getAll",
        {
          withCredentials: true,
        }
      );
      setData(data);
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
      <h3 className="heading center">Projects</h3>
      <div className="top-helpers">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-medium"
        >
          Add project
        </button>

        
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="content-dash">
          {" "}
          {data.map((project) => (
            <Project key={project._id} projects={project} />
          ))}
        </div>
      )}

      {open && <AddProject setOpen={setOpen} />}
    </section>
  );
};

export default Dashboard;
