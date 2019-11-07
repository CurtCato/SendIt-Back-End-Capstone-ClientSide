import React, { useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import { Link } from "react-router-dom";
import suit from "./climber-in-suit.jpg";
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
        <div className="user-gym-image">
          <img className="suit-image" src={suit} alt="suit" />
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
