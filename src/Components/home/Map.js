import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import APIManager from "../modules/APIManager";
import TOKEN from "./token";
import { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "./Map.css";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const Map = props => {
  const [locations, setLocations] = useState([]);
  const [showPopUp, setshowPopUp] = useState(false);
  const mapRef = useRef({});
  const [searchResultLayer, setSearchResultLayer] = useState({});
  const [viewport, setViewPort] = useState({
    width: "100%",
    height: 800,
    latitude: 36.1627,
    longitude: -86.7816,
    zoom: 8,
    bearing: 0,
    pitch: 0
  });

  const redirectToDetails = id => {
    props.history.push(`/gyms/${id}`);
  };

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
        {locations.map(location => {
          return (
            <div className="mapboxgl-marker" key={location.id}>
              <Marker
                latitude={parseFloat(location.latitude)}
                longitude={parseFloat(location.longitude)}
              >
                <img
                  key={location.id}
                  onMouseEnter={() => {
                    setshowPopUp(true);
                  }}
                  onMouseLeave={() => {
                    setshowPopUp(false);
                  }}
                  className="mapMarker"
                  onDoubleClick={() => {
                    redirectToDetails(location.id);
                  }}
                />
              </Marker>
              {showPopUp ? (
                <Popup
                  key={location.id}
                  latitude={parseFloat(location.latitude)}
                  longitude={parseFloat(location.longitude)}
                  anchor="bottom-right"
                  offset={{
                    "bottom-left": [12, -38],
                    bottom: [0, -38],
                    "bottom-right": [-12, -38]
                  }}
                >
                  <h3 style={{ fontSize: 10 }}>{location.gym_name}</h3>
                  <h4 style={{ fontSize: 8 }}>{location.street_address}</h4>
                </Popup>
              ) : (
                ""
              )}
            </div>
          );
        })}
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontWeight: "bolder"
          }}
        >
          Do you have a gym not on the map? Click <a href="/addgym">here</a> to
          add it!
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
