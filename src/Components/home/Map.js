import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import MapGL, { NavigationControl, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import APIManager from "../modules/APIManager";
import TOKEN from "./token";
import DeckGL, { GeoJsonLayer } from "deck.gl"
import Geocoder from "react-map-gl-geocoder"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import "./Map.css";

const geolocateStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const Map = () => {
  const [locations, setLocations] = useState([]);
  const city = useRef();
  const mapRef = useRef({})
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

  const searchMap = e => {
    if (e.keyCode === 13) {
      let input = city.current.value;
      input = input.charAt(0).toUpperCase() + input.slice(1);
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?access_token=${TOKEN}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
        .then(response => response.json())
        .then(response => {
          console.log(response);
        });
    }
  };

  const getGymLocations = () => {
    APIManager.getAll("gyms").then(response => setLocations(response));
  };

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
      })})
  }

  const _onViewportChange = viewport =>
    setViewPort({ ...viewport, transitionDuration: 30 });

  useEffect(() => {
    getGymLocations();
  }, []);

  return (
    <div style={{ margin: "0 auto" }}>
      <input
        onKeyDown={e => searchMap(e)}
        className="search-bar"
        type="text"
        name="city"
        ref={city}
        placeholder="Search by city"
      />
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
            <div key={location.id}>
              <Marker
                latitude={parseFloat(location.latitude)}
                longitude={parseFloat(location.longitude)}
              >
                <Link className="nav-link" to={`/gyms/${location.id}`}>
                  <div key={location.id} className="mapMarker" />
                </Link>
              </Marker>
              {/* <Popup
                coordinates={location.latlng}
                anchor="bottom"
                offset={offset}
              >
                <div className={css(styles.container)}>
                  <div className={css(styles.footer)}>
                    <h1 style={{ fontSize: 15 }}>{location.gym_name}</h1>
                  </div>
                </div>
              </Popup> */}
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
          position="top-left"
        />
      </MapGL>
      {/* <DeckGL {...viewport} layers={[searchResultLayer]} /> */}
    </div>
  );
};

export default Map;
