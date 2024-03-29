import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import "./createGym.css";
import shoes from "./rock-climbing-shoes-laced-726x500.png";

const AddGymForm = props => {
  const gym_name = useRef();
  const street_address = useRef();
  const wall_height = useRef();
  const gym_size = useRef();
  const url = useRef();
  const selectedTypes = useRef([]);

  const [climbingTypes, setClimbingTypes] = useState([]);

  const addToGymList = e => {
    e.preventDefault();

    const newGymInfo = {
      gym_name: gym_name.current.value,
      street_address: street_address.current.value,
      wall_height: wall_height.current.value,
      gym_size: gym_size.current.value,
      url: url.current.value,
      climber_id: localStorage.getItem("user_id"),
      selectedCLimbingTypes: selectedTypes.current
    };

    console.log(newGymInfo);
    APIManager.post("gyms", newGymInfo).then(() => {
      props.history.push("/");
    });
  };

  const getClimbingTypes = () => {
    APIManager.getAll("climbingtypes").then(response =>
      setClimbingTypes(response)
    );
  };

  const typeSelected = id => {
    const typeIds = selectedTypes.current;
    if (!typeIds.includes(id)) {
      typeIds.push(id);
    } else {
      typeIds.splice(typeIds.indexOf(id), 1);
    }
    console.log(typeIds);
  };

  useEffect(() => {
    getClimbingTypes();
  }, []);

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <div className="create-form-div" >
          <div className="form-div">
            <form className="create-form card py-5 px-5 bg-light">
              <h1 className="h3 mb-3 font-weight-normal card-header">Add Your Gym!</h1>
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
                  <label htmlFor="gym_size">Gym Square Footage</label>
                  <input
                    type="text"
                    name="gym_size"
                    ref={gym_size}
                    placeholder="Gym Size"
                    className="form-control"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="url">Gym Website</label>
                  <input
                    type="text"
                    name="url"
                    ref={url}
                    placeholder="Website url"
                    className="form-control"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label>Climbing Types: </label>
                  {climbingTypes.map(climbingType => {
                    return (
                      <label key={climbingType.id}>
                        {climbingType.type_name}{" "}
                        <input
                          key={climbingType.id}
                          name={climbingType.type_name}
                          type="checkbox"
                          value={climbingType.id}
                          onChange={() => typeSelected(climbingType.id)}
                        />
                      </label>
                    );
                  })}
                </fieldset>
                <button onClick={e => addToGymList(e)}>Add Gym</button>
              </div>
            </form>
          </div>
          <div className="create-gym-image-div">
            <img src={shoes} alt="shoes" />
          </div>
        </div>
      </main>
    </>
  );
};

export default AddGymForm;
