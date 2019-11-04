import React, { useState, useEffect, useRef } from "react";
import { Marker, Popup } from "react-map-gl";

const GymPopUp = props => {
  const [showPopUp, setshowPopUp] = useState(false);

  const redirectToDetails = id => {
    props.history.push(`/gyms/${id}`);
  };

  return (
    <div className="mapboxgl-marker" key={props.id}>
      <Marker
        latitude={parseFloat(props.latitude)}
        longitude={parseFloat(props.longitude)}
      >
        <img
          key={props.id}
          className="mapMarker"
          onMouseEnter={() => {
            setshowPopUp(true);
          }}
          onMouseLeave={() => {
            setshowPopUp(false);
          }}
          onDoubleClick={() => {
            redirectToDetails(props.id);
          }}
        />
      </Marker>
      {showPopUp ? (
        <Popup
          key={props.id}
          latitude={parseFloat(props.latitude)}
          longitude={parseFloat(props.longitude)}
          anchor="bottom-right"
          offset={{
            "bottom-left": [12, -38],
            "bottom": [0, -38],
            "bottom-right": [-12, -38]
          }}
        >
          <h3 style={{ fontSize: 10 }}>{props.gym_name}</h3>
          <h4 style={{ fontSize: 8 }}>{props.street_address}</h4>
        </Popup>
      ) : (
        ""
      )}
    </div>
  );
};

export default GymPopUp;
