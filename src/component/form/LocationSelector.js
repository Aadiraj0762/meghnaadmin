// // components/Map.js
// import React, { useRef, useEffect, useState } from "react";
// import mapboxgl from "mapbox-gl";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiYWFkaTc2MiIsImEiOiJjbHZtMWM2aW0ybWFkMnZuMXg5YXR3djljIn0.vUj8hLhZWeAYIB07k9KMyA";

// const Map = () => {
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(77.209); // Default longitude for India
//   const [lat, setLat] = useState(28.6139); // Default latitude for India
//   const [zoom, setZoom] = useState(5); // Default zoom level

//   useEffect(() => {
//     if (map.current) return; // initialize map only once

//     map.current = new mapboxgl.Map({
//       container: mapContainer.current,
//       style: "mapbox://styles/mapbox/streets-v11",
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");

//     // Add geolocation control to get current location
//     map.current.addControl(
//       new mapboxgl.GeolocateControl({
//         positionOptions: {
//           enableHighAccuracy: true,
//         },
//         trackUserLocation: true,
//       })
//     );

//     // Add marker on click to display location
//     map.current.on("click", (e) => {
//       new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map.current);
//     });

//     return () => map.current.remove();
//   }, [lng, lat, zoom]);

//   return (
//     <div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// };

// export default Map;

// ;
// <div className="location-container">
// <label className="cursor-pointer label">
//   <input
//     type="radio"
//     value="Deliver"
//     checked={locationType === "Deliver"}
//     onChange={handleLocationTypeChange}
//     className="form-radio outline-none focus:ring-0 text-emerald-500"
//   />
//   Deliver
// </label>
// <label className="radio-label">
//   <input
//     type="radio"
//     value="Pickup"
//     checked={locationType === "Pickup"}
//     onChange={handleLocationTypeChange}
//     className="form-radio outline-none focus:ring-0 text-emerald-500"
//   />
//   Pickup
// </label>

// {currentLocation && storeData.length > 0 && (
//   <StoreList
//     locationType={locationType}
//     latitude={currentLocation.latitude}
//     longitude={currentLocation.longitude}
//     storeData={storeData}
//     calculateDistance={calculateDistance}
//   />
// )}
// </div>



// const StoreList = ({
//   locationType,
//   latitude,
//   longitude,
//   storeData,
//   calculateDistance,
// }) => {
//   const filteredPickupStores = storeData.filter((store) => {
//     const storeDistance = calculateDistance(
//       latitude,
//       longitude,
//       parseFloat(store.latitude),
//       parseFloat(store.longitude)
//     );
//     return storeDistance <= store.radius;
//   });

//   const isAnyStoreOpenForDelivery = storeData.some((store) => {
//     const now = new Date();
//     const currentHour = now.getHours();
//     const storeOpenTimeHour = parseInt(store.storeOpenTime);
//     let storeCloseTimeHour = parseInt(store.storeCloseTime);
//     if (storeCloseTimeHour < storeOpenTimeHour) {
//       storeCloseTimeHour += 24;
//     }
//     return (
//       locationType === "Deliver" &&
//       currentHour >= storeOpenTimeHour &&
//       currentHour <= storeCloseTimeHour
//     );
//   });

//   useEffect(() => {
//     if (locationType === "Deliver" && isAnyStoreOpenForDelivery) {
//       const openStores = storeData
//         .filter((store) => {
//           const now = new Date();
//           const currentHour = now.getHours();
//           const storeOpenTimeHour = parseInt(store.storeOpenTime);
//           let storeCloseTimeHour = parseInt(store.storeCloseTime);
//           if (storeCloseTimeHour < storeOpenTimeHour) {
//             storeCloseTimeHour += 24;
//           }
//           return (
//             currentHour >= storeOpenTimeHour &&
//             currentHour <= storeCloseTimeHour
//           );
//         })
//         .map((store) => store.storeName)
//         .join(", ");

//       alert(`Order will be prepared in 30 minutes for ${openStores}.`);
//     }
//   }, [locationType, isAnyStoreOpenForDelivery, storeData]);

//   return (
//     <div>
//       <ul>
//         {locationType === "Pickup" && (
//           <li>
//             <label>
//               {/* Select pickup location: */}
//               <select onChange={(e) => onLocationSelect(e.target.value)}>
//                 <option value="">Select location</option>
//                 {filteredPickupStores.map((store) => (
//                   <option key={store._id} value={store._id}>
//                     {store.storeName} - {store.addressLine}, {store.city}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </li>
//         )}
//         {locationType === "Deliver" && isAnyStoreOpenForDelivery ? (
//           <ul>
//             {storeData.map((store) => (
//               <li key={store._id}>
//                 {/* {store.storeName} - {store.addressLine}, {store.city} */}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>
//             {locationType === "Deliver" &&
//               !isAnyStoreOpenForDelivery &&
//               "No stores available for delivery at this time."}
//           </p>
//         )}
//       </ul>
//     </div>
//   );
// };



// const checkStoreTimings = async () => {
//   const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   try {
//     const response = await fetch("http://127.0.0.1:5055/api/store");
//     const storeData = await response.json();

//     const openStores = storeData.filter(store => {
//       const storeOpenTime = store.storeOpenTime;
//       const storeCloseTime = store.storeCloseTime;
//       return currentTime >= storeOpenTime && currentTime <= storeCloseTime;
//     });

//     if (openStores.length > 0) {
//       alert("Your order will be prepared soon.");
//     } else {
//       alert("No stores are available for delivery.");
//     }
//   } catch (error) {
//     console.error("Error fetching store data or comparing timings:", error);
//     alert("Failed to fetch store data or compare timings.");
//   }
// };


// import { useState, useEffect } from 'react';

// function App() {
//   const [storeData, setStoreData] = useState([]);
//   const [locationType, setLocationType] = useState('');
//   const [alertMessage, setAlertMessage] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5055/api/store");
//         const data = await response.json();
//         setStoreData(data);
//       } catch (error) {
//         console.error("Error fetching store data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLocationTypeChange = (e) => {
//     setLocationType(e.target.value);
//     checkStoreAvailability();
//   };

//   const checkStoreAvailability = () => {
//     const currentTime = new Date();
//     const currentHours = currentTime.getHours();
//     const currentMinutes = currentTime.getMinutes();
  
//     const openStores = storeData.filter(store => {
//       const storeOpenTime = new Date(`May 2, 2024 ${store.storeOpenTime}:11`);
//       const storeCloseTime = new Date(`May 2, 2024 ${store.storeCloseTime}:6`);
  
//       return (
//         (storeOpenTime <= currentTime && currentTime <= storeCloseTime) ||
//         (storeOpenTime <= currentTime && currentTime <= storeCloseTime.setMinutes(storeCloseTime.getMinutes() + 30))
//       );
//     });
  
//     if (openStores.length > 0) {
//       setAlertMessage(`Order will be prepared soon at ${openStores.map(store => store.storeName).join(', ')}!`);
//     } else {
//       setAlertMessage('No store available for delivery!');
//     }
//   };

//   return (
//     <div>
//       <div className="grid grid-cols-6 gap-6">
//         <div className="col-span-6 sm:col-span-3">
//           <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
//             <label className="cursor-pointer label">
//               <div className="flex item-center justify-between">
//                 <div className="flex items-center">
//                   <h6 className="font-serif font-medium text-sm text-gray-600">
//                     Delivery
//                   </h6>
//                 </div>
//                 <input
//                   name="paymentMethod"
//                   type="radio"
//                   className="form-radio outline-none focus:ring-0 text-emerald-500"
//                   value="Deliver"
//                   checked={locationType === "Deliver"}
//                   onChange={handleLocationTypeChange}
//                 />
//               </div>
//             </label>
//           </div>
//         </div>
//         <div className="col-span-6 sm:col-span-3">
//           <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
//             <label className="cursor-pointer label">
//               <div className="flex item-center justify-between">
//                 <div className="flex items-center">
//                   <h6 className="font-serif font-medium text-sm text-gray-600">
//                     Pickup
//                   </h6>
//                 </div>
//                 <input
//                   name="paymentMethod"
//                   type="radio"
//                   className="form-radio outline-none focus:ring-0 text-emerald-500"
//                   value="Pickup"
//                   checked={locationType === "Pickup"}
//                   onChange={handleLocationTypeChange}
//                 />
//               </div>
//             </label>
//           </div>
//         </div>
//       </div>
//       {alertMessage && <div>{alertMessage}</div>}
//     </div>
//   );
// }

// export default App;
import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.5937, // India coordinates
  lng: 78.9629,
};

const libraries = ["places"];

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(center);
  const autocompleteRef = useRef(null);

  useEffect(() => {
    if (map && markerPosition) {
      map.panTo(markerPosition);
    }
  }, [map, markerPosition]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarkerPosition({ lat, lng });
    updateLocationDetails(lat, lng);
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setMarkerPosition({ lat, lng });
      updateLocationDetails(lat, lng);
    }
  };

  const updateLocationDetails = (lat, lng) => {
    console.log("New Location:", { lat, lng });
    // You can add your geocoding and store fetching logic here
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBbfnvObzwcs6OLXOmSaG9CtIhwjmBwLTQ" libraries={libraries}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={5}
        onLoad={onLoad}
      >
        <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px",
              top: "10px",
            }}
          />
        </Autocomplete>
        <Marker position={markerPosition} draggable={true} onDragEnd={onMarkerDragEnd} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
