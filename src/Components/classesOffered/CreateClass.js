import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";

const AddClassForm = props => {
  const class_name = useRef();
  const days_offered = useRef();
  const time_offered = useRef();
  const description = useRef();

  const [gym, setGym] = useState([]);

  const getSingleGym = () => {
    APIManager.get("gyms", `${props.match.params.gymId}`).then(response => {
      setGym(response);
    });
  };

  const addClass = e => {
    e.preventDefault();

    const newClassInfo = {
      class_name: class_name.current.value,
      days_offered: days_offered.current.value,
      time_offered: time_offered.current.value,
      description: description.current.value,
      gym_id: gym.id
    };
    APIManager.post("classesoffered", newClassInfo).then(() => {
      props.history.push(`/gyms/${gym.id}`);
    });
  };

  useEffect(() => {
    getSingleGym();
  }, []);

  return (
    <>
      <main style={{ textAlign: "center" }}>
        <form className="form--login">
          <h1 className="h3 mb-3 font-weight-normal">
            Add a Class to your Gym Details!
          </h1>
          <div>
            <fieldset>
              <label htmlFor="class_name">Class Name</label>
              <input
                type="text"
                name="class_name"
                ref={class_name}
                placeholder="Class Name"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="days_offered">Days Offered</label>
              <input
                type="text"
                name="days_offered"
                ref={days_offered}
                placeholder="Days Offered"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="time_offered">Class Times</label>
              <input
                type="text"
                name="time_offered"
                ref={time_offered}
                placeholder="Class Times"
                className="form-control"
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="description">Class Description</label>
              <textarea
                type="text"
                name="description"
                ref={description}
                placeholder="Class Description"
                className="form-control"
                required
              />
            </fieldset>
            <button onClick={e => addClass(e)}>Add this Class</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddClassForm;
