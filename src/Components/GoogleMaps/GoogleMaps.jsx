import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import "./style.css";
const containerStyle = {
  width: "300px",
  height: "156px",
};

const GoogleMaps = ({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  return isLoaded && position ? (
    <>
      <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={10}>
        <Marker position={position} />
      </GoogleMap>
      <a
        target="_blank"
        href={
          "https://www.google.com/maps/search/?api=1&query=" +
          position.lat +
          "," +
          position.lng
        }
      >
        <div className="google-maps-description">
          <div className="google-maps-location"> Our location</div>
          <div className="google-maps-link"> google.com</div>
        </div>
      </a>
    </>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMaps);
