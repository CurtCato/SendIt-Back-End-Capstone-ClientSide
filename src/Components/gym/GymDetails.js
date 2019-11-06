import React, { useEffect, useState } from "react";
import APIManager from "../modules/APIManager";
import "./gymDetails.css"

const GymDetails = props => {
  const [singleGym, setGym] = useState([]);
  const [classOffered, setClassOffered] = useState([]);

  const getSingleGym = () => {
    APIManager.get("gyms", `${props.match.params.gymId}`).then(response => {
      setGym(response);
    });
  };

  const getClassesOffered = () => {
    APIManager.getAll(`classesoffered?gym_id=${props.match.params.gymId}`).then(
      response => {
        setClassOffered(response);
      }
    );
  };

  const deleteGym = () => {
    APIManager.delete("gyms", `${props.match.params.gymId}`).then(
      props.history.push("/")
    );
  };

  const deleteClass = id => {
    APIManager.delete("classesoffered", id).then(() => {
      getClassesOffered();
    });
  };

  useEffect(() => {
    getSingleGym();
    getClassesOffered();
  }, []);

  return (
    <>
      {
        <section
          className="gym-details"
          style={{
            textAlign: "center"
          }}
        >
          <div className="details-list card bg-light">
          <h2 className="card-header m-3">{singleGym.gym_name}</h2>
          <div className="card-body">
          <h5>{singleGym.street_address}: <a href={`https://maps.google.com/?q=${singleGym.street_address}`} target="_blank">Click for Directions</a></h5>
          <h5>Gym Square Footage: {singleGym.gym_size}</h5>
          <h5>Maximum Wall Height: {singleGym.wall_height}</h5>
          <h5>Gym Website: <a href={singleGym.url} target="_blank">Click Me</a></h5>
          <br />
          </div>

          {singleGym.climber_id == localStorage.getItem("user_id") ? (
            <div>
              <div className="gym-button">
              <button
                onClick={() => props.history.push(`/editgym/${singleGym.id}`)}
                >
                Edit Your Gym Details
              </button>
              {" "}
              <button onClick={deleteGym}>Remove Gym from Map</button>
              </div>
              <h3>
                Does your gym offer any classes to members? Click{" "}
                <a href={`/createclass/${singleGym.id}`}>here</a> to add one!
              </h3>
            </div>
          ) : (
            ""
            )}
            </div>

            <div className="card py-4 px-4 class-info">
            <h2 className="card-header m-3">Classes Offered at {singleGym.gym_name}</h2>
          {classOffered.map(classO => {
            return (
              <div key={classO.id} style={{ textAlign: "left" }}>
                <h3>{classO.class_name}</h3>
                <h5>
                  We offer {classO.class_name} on {classO.days_offered} at{" "}
                  {classO.time_offered}
                </h5>
                <h5>Description: {classO.description}</h5>
                {singleGym.climber_id == localStorage.getItem("user_id") ? (
                  <div className="class-button">
                    <button
                      onClick={() =>
                        props.history.push(`/editclass/${classO.id}`)
                      }
                    >
                      Edit Your Class Details
                    </button>
                    {" "}
                    <button
                      onClick={() => {
                        deleteClass(classO.id);
                      }}
                    >
                      Delete Class
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            );
          })}
          </div>
        </section>
      }
    </>
  );
};

export default GymDetails;
