import React, { useRef, useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import "./updateClass.css"

const UpdateClass = props => {
  const [classEdit, setClass] = useState([]);
  const class_name = useRef();
  const days_offered = useRef();
  const time_offered = useRef();
  const description = useRef();

  // this function gets one class' information so it can be displayed in the input fields
  const getClass = () => {
    APIManager.get("classesoffered", `${props.match.params.classId}`).then(response => {
      setClass(response);
    });
  };

  //function that updates the class object in the DB
  //this is called on submit edit button
  const handleUpdate = e => {
    e.preventDefault();

    const updatedClass = {
      id: `${props.match.params.classId}`,
      class_name: class_name.current.value,
      days_offered: days_offered.current.value,
      time_offered: time_offered.current.value,
      description: description.current.value
    };

    //HTTP request from APIManager to update the class object in DB
    APIManager.put("classesoffered", updatedClass).then(() => {
      props.history.push(`/gyms/${classEdit.gym_id}`);
    });
  };

  useEffect(() => {
    getClass();
  }, []);

  //Edit form that user will use to fill out new information
  return (
    <>
      <main className="update-class" style={{ textAlign: "center" }}>
        <form className="update-form card bg-light px-5 py-5" onSubmit={handleUpdate}>
          <h1 className="h3 mb-3 font-weight-normal card-header">Edit This Class</h1>
          <div>
            <fieldset>
              <label htmlFor="inputClassName"> Class Name </label>
              <input
                ref={class_name}
                type="text"
                name="ClassName"
                className="form-control"
                defaultValue={classEdit.class_name}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputDaysOffered"> Days Offered </label>
              <input
                ref={days_offered}
                type="text"
                name="DaysOffered"
                className="form-control"
                defaultValue={classEdit.days_offered}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputTimeOffered"> Time Offered </label>
              <input
                ref={time_offered}
                type="text"
                name="TimeOffered"
                className="form-control"
                defaultValue={classEdit.time_offered}
                required
              />
            </fieldset>
            <fieldset>
              <label htmlFor="inputDescription"> Description </label>
              <textarea
                ref={description}
                type="text"
                name="Description"
                className="form-control"
                defaultValue={classEdit.description}
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

export default UpdateClass;