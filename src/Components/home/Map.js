import React, { useState, useEffect, useRef } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import APIManager from "../modules/APIManager";
import TOKEN from "./token";
import { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";
import GymPopUp from "./GymPopUp"

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const Map = props => {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef({});
  const [searchResultLayer, setSearchResultLayer] = useState({});
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 600,
    latitude: 41.26068,
    longitude: -95.94026,
    zoom: 4,
    bearing: 0,
    pitch: 0
  });

  const getGymLocations = () => {
    APIManager.getAll("gyms").then(response => setLocations(response));
  };

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 30 });

  const _onSearchResultChange = event => {
    setSearchResultLayer({
      ...searchResultLayer,
      searchResultLayer: new GeoJsonLayer({
        id: "search-result",
        data: event.result.geometry,
        getFillColor: [255, 0, 0, 128],
        getRadius: 1000,
        pointRadiusMinPixels: 10,
        pointRadiusMaxPixels: 10
      })
    });
  };

  useEffect(() => {
    getGymLocations();
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <MapGL
        {...viewport}
        ref={mapRef}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={_onViewportChange}
      >
        <div className="nav" style={geolocateStyle}>
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>
        {locations.map(location =>
          <GymPopUp key={location.id} {...props} location={location}/>

        )}
        <h1
          className="addGym text-white"
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bolder",
            background: "black"
          }}
        >
          Click <a href="/addgym">here</a> to add a gym to the map!
        </h1>
        <Geocoder
          mapRef={mapRef}
          onResult={_onSearchResultChange}
          onViewportChange={_onViewportChange}
          mapboxApiAccessToken={TOKEN}
          position="top-right"
        />
      </MapGL>
    </div>
  );
};

export default Map;
