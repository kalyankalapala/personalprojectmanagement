import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import AddEmployees from "./AddEmployees";
import EditEmployee from "./EditEmployee";
import swal from "sweetalert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const EmployeeView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [query, setQuery] = useState("");
  const depId = useLocation().pathname.split("/")[2];
  const [employeeSingle, setEmployeeSingle] = useState({})
  const navigate = useNavigate();
  let count =0
  const getData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8800/api/v1/employees/getAll/${depId}`,
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
      <h2 className="heading center">Employees</h2>
      
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
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading ? (
        <Loader />
      ) : (
        <tbody>
          {" "}
          {data.map((employee) => (
           <tr>
                <td>{count+=1}</td>
                <td>{employee.empName}</td>
                <td>{employee.role}</td>
                <td>{employee.salary}</td>
                <td><button onClick={()=>{setOpenEdit(true); setEmployeeSingle(employee)}} className="btn btn-success">Edit</button><span> </span><button onClick={()=>{
                   confirmAlert({
                    title: "Confirm to delete",
                    message: "Are you sure you want to delete?",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: async () => {
                          try {
                            await axios.delete(
                              `http://localhost:8800/api/v1/employees/${employee._id}`,
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
                {openEdit && <EditEmployee setOpenEdit={setOpenEdit} employee={employeeSingle}/>} 
           </tr>
          ))}
        </tbody>
      )}
      </table>
      {open && <AddEmployees setOpen={setOpen} />}
     
    </section>
  );
};

export default EmployeeView;
