import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";

const AddGymForm = props => {
  const gym_name = useRef();
  const street_address = useRef();
  const wall_height = useRef();
  const gym_size = useRef();

  const [gym, setGym] = useState([]);

  const addToGymList = e => {
    e.preventDefault();

    const newGymInfo = {
      gym_name: gym_name.current.value,
      street_address: street_address.current.value,
      wall_height: wall_height.current.value,
      gym_size: gym_size.current.value,
      climber_id: localStorage.getItem("user_id")
    };
    APIManager.post("gyms", newGymInfo).then(() => {
      props.history.push("/");
    });
  };

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <form className="form--login">
          <h1 className="h3 mb-3 font-weight-normal">Add Your Gym!</h1>
          <div>
            <fieldset>
              <label htmlFor="gym_name">Gym Name</label>
              <input
                type="text"
                name="gym_name"
                ref={gym_name}
                placeholder="Gym Name"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="street_address">Street Address</label>
              <input
                type="text"
                name="street_address"
                ref={street_address}
                placeholder="Street Address, City, State"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="wall_height">Wall Height</label>
              <input
                type="text"
                name="wall_height"
                ref={wall_height}
                placeholder="Wall Height"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="gym_size">Gym Size</label>
              <input
                type="text"
                name="gym_size"
                ref={gym_size}
                placeholder="Gym Size"
                className="form-control"
                required
              />
            </fieldset>
            <button onClick={e => addToGymList(e)}>Add Gym</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddGymForm;
