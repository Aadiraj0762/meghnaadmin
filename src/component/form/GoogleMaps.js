// import React, { useEffect, useRef, useState } from "react";

// const GoogleMaps = ({ setCurrentLocation }) => {
//   const googleMapRef = useRef(null);
//   const googleMap = useRef(null);
//   const [marker, setMarker] = useState(null);

//   useEffect(() => {
//     const googleScript = document.createElement('script');
//     googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDopoI1Gj8swr1i9bvcu4IvS-8rL-hYKSo&libraries=places`;
//     googleScript.async = true;
//     window.document.body.appendChild(googleScript);

//     googleScript.addEventListener('load', () => {
//       googleMap.current = new window.google.maps.Map(googleMapRef.current, {
//         center: { lat: 40.7128, lng: -74.006 },
//         zoom: 13,
//       });

//       googleMap.current.addListener('click', (e) => {
//         placeMarkerAndPanTo(e.latLng, googleMap.current);
//       });
//     });
//   }, []);

//   const placeMarkerAndPanTo = (position, map) => {
//     if (marker) {
//       marker.setMap(null);
//     }

//     const newMarker = new window.google.maps.Marker({
//       position: position,
//       map: map,
//     });

//     setMarker(newMarker);
//     map.panTo(position);

//     setCurrentLocation({
//       latitude: position.lat(),
//       longitude: position.lng()
//     });
//   };

//   return <div ref={googleMapRef} style={{ width: "100%", height: "400px" }} />;
// };

// export default GoogleMaps;

import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629, // India coordinates
};

const GoogleMaps = ({ setFormValues }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "6628f4eae298f828314804hjx4b5ac1",
  });

  const handleMapClick = (event) => {
    setSelectedLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const addressComponents = results[0].address_components;
          const formattedAddress = results[0].formatted_address;

          setFormValues({
            area: addressComponents.find((component) =>
              component.types.includes("sublocality_level_1")
            )?.long_name || "",
            addressLine: addressComponents.find((component) =>
              component.types.includes("route")
            )?.long_name || "",
            pincode: addressComponents.find((component) =>
              component.types.includes("postal_code")
            )?.long_name || "",
            district: addressComponents.find((component) =>
              component.types.includes("administrative_area_level_2")
            )?.long_name || "",
            state: addressComponents.find((component) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name || "",
            city: addressComponents.find((component) =>
              component.types.includes("locality")
            )?.long_name || "",
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng()
          });

          console.log("Formatted Address:", formattedAddress);
          console.log("Latitude:", event.latLng.lat());
          console.log("Longitude:", event.latLng.lng());
        }
      } else {
        console.error("Geocoder failed due to: ", status);
      }
    });
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker
          position={selectedLocation}
          draggable={true}
          onDragEnd={(event) => handleMapClick(event)}
        />
      )}
    </GoogleMap>
  ) : <></>;
};

export default GoogleMaps;

