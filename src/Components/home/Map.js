import React, { useState, useEffect, useRef } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import APIManager from "../modules/APIManager";
import TOKEN from "./token";
import { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";
import GymPopUp from "./GymPopUp";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const Map = props => {
  const [locations, setLocations] = useState([]);
  const [climbingTypes, setClimbingTypes] = useState([]);
  const selectedTypes = useRef([]);
  const mapRef = useRef({});
  const [searchResultLayer, setSearchResultLayer] = useState({});
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 837,
    latitude: 38.89037,
    longitude: -77.03196,
    zoom: 3.5,
    bearing: 0,
    pitch: 0
  });

  const getGymLocations = () => {
    APIManager.getAll("gyms").then(response => setLocations(response));
  };

  const getAutoBelayGymLocations = () => {
    const currentSelection = selectedTypes.current;
    if (currentSelection.includes(1)) {
      APIManager.getAll("gyms/getAutoBelays").then(response =>
        setLocations(response)
      );
    }
  };

  const getTopRopeGymLocations = () => {
    const currentSelection = selectedTypes.current;
    if (currentSelection.includes(2)) {
      APIManager.getAll("gyms/getTopRopes").then(response =>
        setLocations(response)
      );
    }
  };

  const getLeadGymLocations = () => {
    const currentSelection = selectedTypes.current;
    if (currentSelection.includes(3)) {
      APIManager.getAll("gyms/getLead").then(response =>
        setLocations(response)
      );
    }
  };

  const getBoulderGymLocations = () => {
    const currentSelection = selectedTypes.current;
    if (currentSelection.includes(4)) {
      APIManager.getAll("gyms/getBoulders").then(response =>
        setLocations(response)
      );
    }
    console.log(currentSelection);
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

  const getClimbingTypes = () => {
    APIManager.getAll("climbingtypes").then(response =>
      setClimbingTypes(response)
    );
  };

  const typeSelected = id => {
    const typeIds = selectedTypes.current;
    if (!typeIds.includes(id)) {
      typeIds.push(id);
    } else {
      typeIds.splice(typeIds.indexOf(id), 1);
    }
  };

  useEffect(() => {
    getGymLocations();
    getClimbingTypes();
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
        <div className="geo-nav" style={geolocateStyle}>
          <NavigationControl onViewportChange={_onViewportChange} />
        </div>
        {locations.map(location => (
          <GymPopUp key={location.id} {...props} location={location} />
        ))}
        <button
          className="addGym"
          onClick={() => props.history.push("/addgym")}
        >
          Click here to add a gym to the map!
        </button>
        <fieldset
          className="filter-form"
          style={{
            textAlign: "center",
            fontSize: "25px"
          }}
        >
          <label>Filter by Climbing Types:</label>{" "}
          {climbingTypes.map(climbingType => {
            return (
              <label key={climbingType.id}>
                {climbingType.type_name}{" "}
                <input
                  key={climbingType.id}
                  name={climbingType.type_name}
                  type="checkbox"
                  value={climbingType.id}
                  onChange={() => {
                    typeSelected(climbingType.id);
                    getAutoBelayGymLocations();
                    getTopRopeGymLocations();
                    getLeadGymLocations();
                    getBoulderGymLocations();
                  }}
                />
              </label>
            );
          })}
        </fieldset>
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
