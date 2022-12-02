import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddDepartments from "./AddDepartments";
import EditDepartments from "./EditDepartments";
const DepartmentView = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [query, setQuery] = useState("");
  const [departmentSingle, setDepartmentSingle] = useState({})
  const navigate = useNavigate();
  let count =0
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8800/api/v1/departments/getAll`,
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
      <h2 className="heading center">Departments</h2>
      
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="btn"
      >
        Add
      </button>
      <table className="styled-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Role</th>
            <th>Head</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
        <Loader />
      ) : (
        <tbody>
          {" "}
          {data.map((department) => (
           <tr>
                <td>{count+=1}</td>
                <td>{department.dName}</td>
                <td>{department.role}</td>
                <td>{department.dHead}</td>
                <td><Link to={`/employees/${department._id}`} className="btn">Employees</Link>
                <span> </span>
                <button onClick={()=>{setOpenEdit(true); setDepartmentSingle(department)}} className="btn btn-success">Edit</button>
                <span> </span>
                <button onClick={()=>{
                   confirmAlert({
                    title: "Confirm to delete",
                    message: "Are you sure you want to delete?",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: async () => {
                          try {
                            await axios.delete(
                              `http://localhost:8800/api/v1/departments/${department._id}`,
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
                
                }} className="btn btn-danger">Delete</button></td>
                {openEdit && <EditDepartments setOpenEdit={setOpenEdit} department={departmentSingle}/>} 
           </tr>
          ))}
        </tbody>
      )}
      </table>
      {open && <AddDepartments setOpen={setOpen} />}
     
    </section>
  )
}

export default DepartmentView