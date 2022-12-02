import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectCard from "../../components/Card/ProjectCard";
import Loader from "../../components/Loader";
import AddProject from "./AddProject";

const SearchPage = () => {
  const [projects, setProjects] = useState([]);
  const query = useLocation().search;
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8800/api/v1/projects/search${query}`,
        { withCredentials: true }
      );
      setProjects(res.data);
      setLoading(false);
    };
    fetchProjects();
  }, [query]);
  return (
    <section>
      <div className="top-helpers">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-medium"
        >
          Add project
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

      {loading ? (
        <Loader />
      ) : (
        <div className="content-dash">
          {" "}
          {projects.map((project) => (
            <ProjectCard key={project._id} projects={project} />
          ))}
        </div>
      )}

      {open && <AddProject setOpen={setOpen} />}
    </section>
  );
};

export default SearchPage;
