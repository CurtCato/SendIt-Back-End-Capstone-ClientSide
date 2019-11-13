import React, { useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";
import quick_draws from "./quick-draws.jpg";
import "./userGym.css";

const UserGyms = props => {
  const [userGyms, setUserGyms] = useState([]);

  const getUserGyms = () => {
    APIManager.getAll("gyms/usergyms").then(response => setUserGyms(response));
  };

  useEffect(() => {
    getUserGyms();
  }, []);

  return (
    <>
      <div className="userGyms">
        <div className="user-gyms-image-div">
          <img className="quick-draws-image" src={quick_draws} alt="quick-draws" />
        </div>
        <h4 className="userGymsHeader">
          <h1 className="card-header">Click on a gym to view details</h1>
          <br />
          {userGyms.map(gym => {
            return (
              <ul className="userGymul" key={gym.id}>
                <li>
                  <Link to={`/gyms/${gym.id}`}>{gym.gym_name}</Link> (
                  {gym.street_address})
                </li>
              </ul>
            );
          })}
        </h4>
      </div>
    </>
  );
};

export default UserGyms;
