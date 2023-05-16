import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import "./AllScenarios.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const AllScenarios = () => {
  const [scenarios, setScenario] = useState([]);
  const navigate = useNavigate();

  const [noOfVehicles, setNumberOfVehicles] = useState(null);
  const getData = async () => {
    const response = await fetch("http://localhost:8080/scenarios");
    const jsonData = await response.json();

    setScenario(jsonData);
  };

  const handleUpdate = (id, name, time) => {
    navigate("/add-scenario");
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("time", time);
  };

  useEffect(() => {
    getData();
  }, [noOfVehicles]);

  return (
    <Layout>
      <div className="container">
        <div className="header">
          <h3>All Scenario</h3>
          <div className="header-button">
            <button className="newScenario">New Scenario</button>
            <button className="addVehicle">Add Vehicles</button>
            <button className="deleteAll">Delete All</button>
          </div>
        </div>
        <div className="tableBody">
          <div className="vehicleTable">
            <table>
              <thead>
                <tr>
                  <th>Scenario Id</th>
                  <th>Scenario Name</th>
                  <th>Scenario Time</th>
                  <th>Number of vehicles</th>
                  <th>Add vehicles</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((item, id) => {
                  return (
                    <tr key={item.id}>
                      <th>{item.id}</th>
                      <td>{item.scenarioName}</td>
                      <td>{item.scenarioTime}</td>
                      <td>{}</td>
                      <td
                        onClick={() => {
                          navigate("/add-vehicles");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i class="fa-solid fa-circle-plus"></i>
                      </td>
                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handleUpdate(
                            item.id,
                            item.scenarioName,
                            item.scenarioTime
                          )
                        }
                      >
                        <i class="fa-solid fa-pen"></i>
                      </td>
                      <td>
                        <i class="fa-solid fa-trash"></i>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllScenarios;
