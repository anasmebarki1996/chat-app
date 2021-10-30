import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: "100%",
  height: "156px",
};

const GoogleMaps = ({ position }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  return isLoaded && position ? (
    <div className="google-maps-container">
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
        rel="noreferrer"
      >
        <div className="google-maps-description">
          <div className="google-maps-location"> Our location</div>
          <div className="google-maps-link"> google.com</div>
        </div>
      </a>
    </div>
  ) : (
    <></>
  );
};

export default React.memo(GoogleMaps);
