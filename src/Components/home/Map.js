import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import APIManager from "../modules/APIManager";
import TOKEN from "./token";
import "./Map.css";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const Map = () => {
  const [locations, setLocations] = useState([]);
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 800,
    latitude: 36.1627,
    longitude: -86.7816,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });

  const getGymLocations = () => {
    APIManager.getAll("gyms").then(response => setLocations(response));
  };

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 30 });

  useEffect(() => {
    getGymLocations();
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <h1
        style={{ textAlign: "center", fontSize: "25px", fontWeight: "bolder" }}
      >
        Do you have a gym not on the map? Click <a href="/addgym">here</a> to add it!
      </h1>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={_onViewportChange}
      >
        <div className="nav" style={geolocateStyle}>
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>
        {locations.map(location => {
          return (
            <div key={location.id}>
              <Marker
                latitude={parseFloat(location.latitude)}
                longitude={parseFloat(location.longitude)}
              >
                <Link className="nav-link" to={`/gyms/${location.id}`}>
                <div
                  key={location.id}
                  className="mapMarker"
                />
                </Link>
              </Marker>
            </div>
          );
        })}
      </ReactMapGL>
    </div>
  );
};

export default Map;
