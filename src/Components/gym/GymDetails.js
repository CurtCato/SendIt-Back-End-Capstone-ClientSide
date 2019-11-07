import React, { useEffect, useState, useRef } from "react";
import APIManager from "../modules/APIManager";
import "./gymDetails.css";

const GymDetails = props => {
  const [singleGym, setGym] = useState([]);
  const climbTypes = useRef([]);
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

  // console.log(singleGym.matching_types.climb_type);

  return (
    <>
      {
        <section
          className="gym-details"
          style={{
            textAlign: "center"
          }}
        >
          <div className="overlay">
          <div className="details-list card py-3 bg-light">
            <h2 className="card-header m-3">{singleGym.gym_name}</h2>
            <div className="card-body">
              <h5>
                <strong>Gym Address:</strong> {singleGym.street_address}:{" "}
                <a
                  href={`https://maps.google.com/?q=${singleGym.street_address}`}
                  target="_blank"
                >
                  Click for Directions
                </a>
              </h5>
              <h5>
                <strong>Square Footage:</strong> {singleGym.gym_size} square
                feet
              </h5>
              <h5>
                <strong>Max Wall Height:</strong> {singleGym.wall_height} feet
              </h5>
              <h5>
                <strong>Gym Website:</strong>{" "}
                <a href={`http://${singleGym.url}`} target="_blank">
                  Click To View Website
                </a>
              </h5>{" "}
              {/* {singleGym.matching_types.forEach(type => {
                climbTypes.push(type);
              })} */}
              {/* <h5>Climbing Types: {singleGym.matching_types[0].climbing_type.type_name}</h5> */}
              <br />
            </div>

            {singleGym.climber_id == localStorage.getItem("user_id") ? (
              <div>
                <div className="gym-button">
                  <button
                    onClick={() =>
                      props.history.push(`/editgym/${singleGym.id}`)
                    }
                  >
                    Edit Your Gym Details
                  </button>

                  <button
                    onClick={() =>
                      props.history.push(`/createclass/${singleGym.id}`)
                    }
                  >
                    Add A Fitness Class
                  </button>
                  <button onClick={deleteGym}>Remove Gym from Map</button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="card py-4 px-4 class-info">
            <h2 className="card-header m-3">
              Classes Offered at {singleGym.gym_name}
            </h2>
            {classOffered.map(classO => {
              return (
                <div className="class-details">
                  <div key={classO.id} style={{ textAlign: "left" }}>
                    <h3>{classO.class_name}</h3>
                    <h5>
                      We offer {classO.class_name} on {classO.days_offered} at{" "}
                      {classO.time_offered}
                    </h5>
                    <h5><strong>Description:</strong> {classO.description}</h5>
                    {singleGym.climber_id == localStorage.getItem("user_id") ? (
                      <div className="class-button">
                        <button
                          onClick={() =>
                            props.history.push(`/editclass/${classO.id}`)
                          }
                        >
                          Edit Your Class Details
                        </button>{" "}
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
                </div>
              );
            })}
          </div>
          </div>
        </section>
      }
    </>
  );
};

export default GymDetails;
