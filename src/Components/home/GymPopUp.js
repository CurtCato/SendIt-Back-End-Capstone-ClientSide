import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";



const GymPopUp = props => {
  const [showPopUp, setshowPopUp] = useState(false);

    const redirectToDetails = id => {
        props.history.push(`/gyms/${id}`);
  };

  return (
    <div className="mapboxgl-marker">
      <Marker
        latitude={parseFloat(props.location.latitude)}
        longitude={parseFloat(props.location.longitude)}
      >
        <img
          alt=""
          key={props.location.id}
          onMouseOver={() => {
            setshowPopUp(true);
          }}
          onMouseLeave={() => {
            setshowPopUp(false);
          }}
          className="mapMarker"
          onClick={()=>{redirectToDetails(props.location.id)}}
        />
      </Marker>
      {showPopUp ? (
        <Popup
          key={props.location.id}
          latitude={parseFloat(props.location.latitude)}
          longitude={parseFloat(props.location.longitude)}
          anchor="bottom-right"
          offset={{
            "bottom-left": [12, -38],
            "bottom": [0, -38],
            "bottom-right": [-12, -38]
          }}
        >
          <h3 style={{ fontSize: 10 }}>{props.location.gym_name}</h3>
          <h4 style={{ fontSize: 8 }}>{props.location.street_address}</h4>
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
};

export default GymPopUp;
