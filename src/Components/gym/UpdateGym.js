import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";

const UpdateGym = props => {
  const [gymEdit, setGym] = useState([]);
  const street_address = useRef();
  const gym_name = useRef();
  const wall_height = useRef();
  const gym_size = useRef();
  const url = useRef()

  // this function gets one gym's information so it can be displayed in the input fields
  const getGym = () => {
    APIManager.get("gyms", `${props.match.params.gymId}`).then(response => {
      setGym(response);
    });
  };

  //function that updates the gym object in the DB
  //this is called on submit edit button
  const handleUpdate = e => {
    e.preventDefault();

    const updatedGym = {
      id: `${props.match.params.gymId}`,
      street_address: street_address.current.value,
      gym_name: gym_name.current.value,
      wall_height: wall_height.current.value,
      gym_size: gym_size.current.value,
      url: url.current.value
    };

    //HTTP request from APIManager to update the gym object in DB
    APIManager.put("gyms", updatedGym).then(() => {
      props.history.push(`/gyms/${gymEdit.id}`);
    });
  };

  useEffect(() => {
    getGym();
  }, []);

  //Edit form that user will use to fill out new information
  return (
    <>
      <main style={{ textAlign: "center" }}>
        <form className="form--login" onSubmit={handleUpdate}>
          <h1 className="h3 mb-3 font-weight-normal">Edit Form</h1>
          <div>
            <fieldset>
              <label htmlFor="inputAddress"> Address </label>
              <input
                ref={street_address}
                type="text"
                name="address"
                className="form-control"
                defaultValue={gymEdit.street_address}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputGymName"> Gym Name </label>
              <input
                ref={gym_name}
                type="text"
                name="gymName"
                className="form-control"
                defaultValue={gymEdit.gym_name}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputWallHeight"> Wall Height </label>
              <input
                ref={wall_height}
                type="text"
                name="wallHeight"
                className="form-control"
                defaultValue={gymEdit.wall_height}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputGymSize"> Gym Size </label>
              <input
                ref={gym_size}
                type="text"
                name="gymSize"
                className="form-control"
                defaultValue={gymEdit.gym_size}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputUrl"> Gym Website </label>
              <input
                ref={url}
                type="text"
                name="url"
                className="form-control"
                defaultValue={gymEdit.url}
                required
              />
            </fieldset>
          </div>

          <fieldset>
            <button type="submit">Submit Update</button>
          </fieldset>
        </form>
      </main>
    </>
  );
};

export default UpdateGym;
