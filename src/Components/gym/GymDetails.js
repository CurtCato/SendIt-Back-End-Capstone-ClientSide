import React, { useEffect, useState } from "react";
import APIManager from "../modules/APIManager";

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
          <h2>{singleGym.gym_name}</h2>
          <h5>{singleGym.street_address}</h5>
          <h5>Gym Square Footage: {singleGym.gym_size}</h5>
          <h5>Maximum Wall Height: {singleGym.wall_height}</h5>
          <br />
          <h2>Classes Offered at {singleGym.gym_name}</h2>

          {singleGym.climber_id === localStorage.getItem("user_id") ? (
            <div>
              <button
                onClick={() => props.history.push(`/editgym/${singleGym.id}`)}
              >
                Edit Your Gym Details
              </button>
              <button onClick={deleteGym}>Remove Gym from Map</button>
              <h3>
                Does your gym offer any classes to members? Click{" "}
                <a href={`/createclass/${singleGym.id}`}>here</a> to add one!
              </h3>
            </div>
          ) : (
            ""
          )}
          {classOffered.map(classO => {
            return (
              <div key={classO.id} style={{ textAlign: "left" }}>
                <h3>{classO.class_name}</h3>
                <h5>
                  We offer {classO.class_name} on {classO.days_offered} at{" "}
                  {classO.time_offered}
                </h5>
                <h5>Description: {classO.description}</h5>
                {singleGym.climber_id === localStorage.getItem("user_id") ? (
                  <div>
                    <button
                      onClick={() =>
                        props.history.push(`/editclass/${classO.id}`)
                      }
                    >
                      Edit Your Class Details
                    </button>
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
        </section>
      }
    </>
  );
};

export default GymDetails;
