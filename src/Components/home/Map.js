import React,{ useState } from 'react'
import MapGL, {GeolocateControl } from 'react-map-gl'
// import config from '../config'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

const TOKEN=mapboxgl.accessToken='pk.eyJ1IjoiY3VydGNhdG8iLCJhIjoiY2syNm96N3A5MDh5ODNtb2p4OXFmMHZhYyJ9.0D76nINjKYmKDJr4iyFydQ'

const geolocateStyle = {
  float: 'left',
  margin: '50px',
  padding: '10px'
};

const Map = () => {

  const [viewport, setViewPort ] = useState({
    width: "100%",
    height: 900,
    latitude: 0,
    longitude: 0,
    zoom: 2
  })

  const _onViewportChange = viewport => setViewPort({...viewport, transitionDuration: 3000 })

  return (
    <div style={{ margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', fontSize: '25px', fontWeight: 'bolder' }}>GeoLocator: Click To Find Your Location or click <a href="/search">here</a> to search for a location</h1>
      <MapGL
        {...viewport}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v8"
        onViewportChange={_onViewportChange}
      >
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={{enableHighAccuracy: true}}
          trackUserLocation={true}
        />
      </MapGL>
    </div>
  )
}

export default Map