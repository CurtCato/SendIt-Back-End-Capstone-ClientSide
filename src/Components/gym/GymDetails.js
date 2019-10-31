import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import APIManager from "../modules/APIManager";

const GymDetails = props => {
  const [singleGym, setGym] = useState([]);

  const getSingleGym = () => {
    APIManager.get("gyms", `${props.match.params.gymId}`).then(response => {
      setGym(response);
    });
  };

  const deleteGym = () => {
      APIManager.delete("gyms", `${props.match.params.gymId}`).then(props.history.push("/"))
  }


  useEffect(() => {
    getSingleGym();
  }, []);

  return (
    <>
      {
        <section className="gym-details">
          <h3>{singleGym.gym_name}</h3>
          <p>{singleGym.street_address}</p>
          <p>{singleGym.gym_size}</p>
          <p>{singleGym.wall_height}</p>
          <br />
        {singleGym.climber_id == localStorage.getItem("user_id") ? (
            <div>
            <Link className="nav-link" to={`/editgym/${singleGym.id}`}>
            <button>Edit Your Gym Details</button>
            </Link>
            <button onClick={deleteGym}>Remove Gym from Map</button>
            </div>
        ) : (
            ""
        )}
        </section>
      }
    </>
  );
};

export default GymDetails;
