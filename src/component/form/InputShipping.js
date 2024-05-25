// import React, { useState, useEffect } from "react";
// import { FiTruck } from "react-icons/fi";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default center for India

// const InputShipping = ({
//   register,
//   value,
//   time,
//   cost,
//   currency,
//   handleShippingCost,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [addressArea, setAddressArea] = useState("");
//   const [addressPincode, setAddressPincode] = useState("");
//   const [addressCountry, setAddressCountry] = useState("");
//   const [addressState, setAddressState] = useState("");

//   useEffect(() => {
//     fetch("http://127.0.0.1:5055/api/store")
//       .then((response) => response.json())
//       .then((data) => {
//         const storeNames = data.map((store) => store.storeName);
//         setStoreOptions(storeNames);
//       })
//       .catch((error) => console.error(error));

//     getUserLocation();
//   }, []);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });

//         fetch(
//           `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=75dc1db0c0164fd4ae9a04e4995bfed8`
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             const address = data.results[0].formatted;
//             setUserAddress(address);
//             console.log("Geolocation:", latitude, longitude);
//             console.log("Address:", address);
//           });
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOptionChange = (selectedValue) => {
//     if (selectedValue === selectedOption) {
//       setSelectedOption("");
//     } else {
//       setSelectedOption(selectedValue);
//       handleShippingCost(
//         selectedValue === "Branch" || selectedValue === "Deliver" ? cost : 0
//       );
//     }
//   };

//   const handleManualLocation = (event) => {
//     setUserAddress(event.target.value);
//   };

//   return (
//     <div>
//       <div className="p-3 card border border-gray-200 bg-white rounded-md">
//         <label className="cursor-pointer label">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <span className="text-2xl mr-3 text-gray-400">
//                 <FiTruck />
//               </span>
//               <div>
//                 <h6 className="font-serif font-medium text-sm text-gray-600">
//                   {value}
//                 </h6>
//                 <p className="text-xs text-gray-500 font-medium">
//                   Delivery: {time}{" "}
//                   <span className="font-medium text-gray-600">
//                     Cost: {currency}
//                     {cost}.00
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <input
//               onClick={() => handleOptionChange(value)}
//               {...register(`shippingOption`, {
//                 required: "Shipping Option is required!",
//               })}
//               name="shippingOption"
//               type="radio"
//               value={value}
//               className="form-radio outline-none focus:ring-0 text-emerald-500"
//             />
//           </div>
//         </label>
//         {selectedOption === "Branch" && (
//           <div>
//             {/* Display dropdown for Branch option */}
//             <select>
//               {storeOptions.map((store, index) => (
//                 <option key={index} value={store}>
//                   {store}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {selectedOption === "Deliver" && (
//           <div>
//             {/* Display textbox for Deliver option */}
//             <input
//               type="text"
//               placeholder="Enter Delivery Address"
//               value={userAddress}
//               onChange={handleManualLocation}
//             />
//             <p>Alternatively, you can select your location on the map:</p>
//             <LoadScript googleMapsApiKey="AIzaSyDopoI1Gj8swr1i9bvcu4IvS-8rL-hYKSo">
//               // Inside the GoogleMap component in the InputShipping component
//               <GoogleMap
//                 mapContainerStyle={{ width: "100%", height: "400px" }}
//                 center={userLocation || defaultCenter}
//                 zoom={userLocation ? 15 : 5}
//                 options={{ draggable: true }} // Enable map dragging
//                 onClick={(e) => {
//                   setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//                 }}
//                 onDragEnd={() => {
//                   fetch(
//                     `https://api.opencagedata.com/geocode/v1/json?q=${userLocation.lat}+${userLocation.lng}&key=75dc1db0c0164fd4ae9a04e4995bfed8`
//                   )
//                     .then((response) => response.json())
//                     .then((data) => {
//                       const address = data.results[0].formatted;
//                       setUserAddress(address);
//                       console.log("Address:", address);
//                     });
//                 }}
//               >
//                 {userLocation && <Marker position={userLocation} />}
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InputShipping;

// import React, { useState, useEffect } from "react";
// import { FiTruck } from "react-icons/fi";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default center for India

// const InputShipping = ({
//   register,
//   value,
//   time,
//   cost,
//   currency,
//   handleShippingCost,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [currentStore, setCurrentStore] = useState({});

//   useEffect(() => {
//     fetch("http://127.0.0.1:5055/api/store")
//       .then((response) => response.json())
//       .then((data) => {
//         setStoreOptions(data);
//       })
//       .catch((error) => console.error(error));

//     getUserLocation();
//   }, []);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });

//         fetch(
//           `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=75dc1db0c0164fd4ae9a04e4995bfed8`
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             const address = data.results[0].formatted;
//             setUserAddress(address);
//           });
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOptionChange = (selectedValue) => {
//     const selectedStore = storeOptions.find((store) => store.storeName === selectedValue);

//     if (selectedStore && selectedStore.storeOpenTime && selectedStore.storeCloseTime) {
//       const currentTime = new Date();
//       const storeStartTime = new Date();
//       storeStartTime.setHours(selectedStore.storeOpenTime.split(":")[0]);
//       storeStartTime.setMinutes(selectedStore.storeOpenTime.split(":")[1]);

//       const storeEndTime = new Date();
//       storeEndTime.setHours(selectedStore.storeCloseTime.split(":")[0]);
//       storeEndTime.setMinutes(selectedStore.storeCloseTime.split(":")[1]);

//       if (currentTime >= storeStartTime && currentTime <= storeEndTime) {
//         setSelectedOption(selectedValue);
//         handleShippingCost(selectedValue === "Branch" || selectedValue === "Deliver" ? cost : 0);
//       } else {
//         alert("Store is closed. We are unable to deliver right now.");
//         setSelectedOption("");
//         handleShippingCost(0);
//       }
//     } else {
//       alert("Error: Store information is incomplete.");
//     }
//   };

//   const handleManualLocation = (event) => {
//     setUserAddress(event.target.value);
//   };

//   return (
//     <div>
//       <div className="p-3 card border border-gray-200 bg-white rounded-md">
//         <label className="cursor-pointer label">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <span className="text-2xl mr-3 text-gray-400">
//                 <FiTruck />
//               </span>
//               <div>
//                 <h6 className="font-serif font-medium text-sm text-gray-600">{value}</h6>
//                 <p className="text-xs text-gray-500 font-medium">
//                   Delivery: {time}{" "}
//                   <span className="font-medium text-gray-600">
//                     Cost: {currency}
//                     {cost}.00
//                   </span>
//                 </p>
//               </div>
//             </div>
//             <input
//               onClick={() => handleOptionChange(value)}
//               {...register(`shippingOption`, {
//                 required: "Shipping Option is required!",
//               })}
//               name="shippingOption"
//               type="radio"
//               value={value}
//               className="form-radio outline-none focus:ring-0 text-emerald-500"
//             />
//           </div>
//         </label>
//         {selectedOption === "Branch" && (
//           <div>
//             {/* Display dropdown for Branch option */}
//             <select>
//               {storeOptions.map((store, index) => (
//                 <option key={index} value={store.storeName}>
//                   {store.storeName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {selectedOption === "Deliver" && (
//           <div>
//             {/* Display textbox for Deliver option */}
//             <input
//               type="text"
//               placeholder="Enter Delivery Address"
//               value={userAddress}
//               onChange={handleManualLocation}
//             />
//             <p>Alternatively, you can select your location on the map:</p>
//             <LoadScript googleMapsApiKey="AIzaSyDopoI1Gj8swr1i9bvcu4IvS-8rL-hYKSo">
//               <GoogleMap
//                 mapContainerStyle={{ width: "100%", height: "400px" }}
//                 center={userLocation || defaultCenter}
//                 zoom={userLocation ? 15 : 5}
//                 options={{ draggable: true }}
//                 onClick={(e) => {
//                   setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//                 }}
//                 onDragEnd={() => {
//                   // Fetching address based on user location
//                 }}
//               >
//                 {userLocation && <Marker position={userLocation} />}
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InputShipping;
// import React, { useState, useEffect } from "react";
// import { FiTruck } from "react-icons/fi";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const defaultCenter = { lat: 20.5937, lng: 78.9629 }; // Default center for India

// const InputShipping = ({
//   register,
//   value,
//   time,
//   cost,
//   currency,
//   handleShippingCost,
// }) => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [storeOptions, setStoreOptions] = useState([]);
//   const [userLocation, setUserLocation] = useState(null);
//   const [userAddress, setUserAddress] = useState("");
//   const [storeOpen, setStoreOpen] = useState(false); // State to track if the store is open

//   useEffect(() => {
//     fetch("http://127.0.0.1:5055/api/store")
//       .then((response) => response.json())
//       .then((data) => {
//         setStoreOptions(data);
//       })
//       .catch((error) => console.error(error));

//     getUserLocation();
//   }, []);

//   const getUserLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation({ lat: latitude, lng: longitude });

//         fetch(
//           `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=75dc1db0c0164fd4ae9a04e4995bfed8`
//         )
//           .then((response) => response.json())
//           .then((data) => {
//             const address = data.results[0].formatted;
//             setUserAddress(address);
//             console.log("Geolocation:", latitude, longitude);
//             console.log("Address:", address);
//           });
//       });
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const handleOptionChange = (selectedValue) => {
//     if (selectedValue === selectedOption) {
//       setSelectedOption("");
//     } else {
//       setSelectedOption(selectedValue);
//       handleShippingCost(
//         selectedValue === "Branch" || selectedValue === "Deliver" ? cost : 0
//       );
//     }
//   };

//   const handleManualLocation = (event) => {
//     setUserAddress(event.target.value);
//   };

//   // Check if the store is open based on current time and store's opening/closing times
//   useEffect(() => {
//     const checkStoreOpen = () => {
//       const now = new Date();
//       const currentHour = now.getHours();
//       const currentMinute = now.getMinutes();
//       const currentTime = `${currentHour}:${currentMinute}`;

//       const selectedStore = storeOptions.find((store) => store.storeName === value);

//       if (!selectedStore) {
//         setStoreOpen(false);
//         return;
//       }

//       const storeOpenTime = selectedStore.storeOpenTime;
//       const storeCloseTime = selectedStore.storeCloseTime;

//       if (currentTime >= storeOpenTime && currentTime <= storeCloseTime) {
//         setStoreOpen(true);
//       } else {
//         setStoreOpen(false);
//         alert("Store is closed. Delivery is unavailable.");
//       }
//     };

//     checkStoreOpen();
//   }, [value, storeOptions]);

//   return (
//     <div>
//       <div className="p-3 card border border-gray-200 bg-white rounded-md">
//         <label className="cursor-pointer label">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <span className="text-2xl mr-3 text-gray-400">
//                 <FiTruck />
//               </span>
//               <div>
//                 <h6 className="font-serif font-medium text-sm text-gray-600">
//                   {value}
//                 </h6>
//                 <p className="text-xs text-gray-500 font-medium">
//                   Delivery: {time}{" "}
//                   <span className="font-medium text-gray-600">
//                     Cost: {currency}
//                     {cost}.00
//                   </span>
//                 </p>
//                 {storeOpen && <p>Order will be ready soon.</p>}
//               </div>
//             </div>
//             <input
//               onClick={() => handleOptionChange(value)}
//               {...register(`shippingOption`, {
//                 required: "Shipping Option is required!",
//               })}
//               name="shippingOption"
//               type="radio"
//               value={value}
//               className="form-radio outline-none focus:ring-0 text-emerald-500"
//             />
//           </div>
//         </label>
//         {selectedOption === "Branch" && (
//           <div>
//             {/* Display dropdown for Branch option */}
//             <select>
//               {storeOptions.map((store, index) => (
//                 <option key={index} value={store.storeName}>
//                   {store.storeName}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}
//         {selectedOption === "Deliver" && (
//           <div>
//             {/* Display textbox for Deliver option */}
//             <input
//               type="text"
//               placeholder="Enter Delivery Address"
//               value={userAddress}
//               onChange={handleManualLocation}
//             />
//             <p>Alternatively, you can select your location on the map:</p>
//             <LoadScript googleMapsApiKey="">
//               <GoogleMap
//                 mapContainerStyle={{ width: "100%", height: "400px" }}
//                 center={userLocation || defaultCenter}
//                 zoom={userLocation ? 15 : 5}
//                 options={{ draggable: true }} // Enable map dragging
//                 onClick={(e) => {
//                   setUserLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
//                 }}
//                 onDragEnd={() => {
//                   fetch(
//                     `https://api.opencagedata.com/geocode/v1/json?q=${userLocation.lat}+${userLocation.lng}&key=75dc1db0c0164fd4ae9a04e4995bfed8`
//                   )
//                     .then((response) => response.json())
//                     .then((data) => {
//                       const address = data.results[0].formatted;
//                       setUserAddress(address);
//                       console.log("Address:", address);
//                     });
//                 }}
//               >
//                 {userLocation && <Marker position={userLocation} />}
//               </GoogleMap>
//             </LoadScript>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InputShipping;

// import React, { useState, useEffect } from 'react';

// const LocationSelection = () => {
//   const [locationType, setLocationType] = useState('Deliver');
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleLocationTypeChange = (event) => {
//     setLocationType(event.target.value);
//   };

//   return (
//     <div>
//       <label>
//         <input type="radio" value="Deliver" checked={locationType === 'Deliver'} onChange={handleLocationTypeChange} />
//         Deliver
//       </label>
//       <label>
//         <input type="radio" value="Pickup" checked={locationType === 'Pickup'} onChange={handleLocationTypeChange} />
//         Pickup
//       </label>

//       {locationType === 'Pickup' && currentLocation && (
//         <StoreList latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
//       )}

//       {locationType === 'Deliver' && currentLocation && (
//         <StoreList latitude={currentLocation.latitude} longitude={currentLocation.longitude} />
//       )}
//     </div>
//   );
// };

// const StoreList = ({ latitude, longitude }) => {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5055/api/store`);
//         const data = await response.json();

//         // Filter stores based on distance from the current location
//         const filteredStores = data.filter(store => {
//           const storeDistance = calculateDistance(latitude, longitude, parseFloat(store.latitude), parseFloat(store.longitude));
//           return storeDistance <= store.radius;
//         });

//         setStores(filteredStores);
//       } catch (error) {
//         console.error('Error fetching store data:', error);
//       }
//     };

//     fetchData();
//   }, [latitude, longitude]);

//   return (
//     <div>
//       <h2>Stores</h2>
//       <ul>
//         {stores.map(store => (
//           <li key={store._id}>
//             {store.storeName} - {store.addressLine}, {store.city}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// };

// const deg2rad = (deg) => {
//   return deg * (Math.PI / 180);
// };

// export default LocationSelection;

// import React, { useState, useEffect } from 'react';

// const LocationSelection = () => {
//   const [locationType, setLocationType] = useState('Deliver');
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   const handleLocationTypeChange = (event) => {
//     setLocationType(event.target.value);
//   };

//   return (
//     <div>
//       <label>
//         <input type="radio" value="Deliver" checked={locationType === 'Deliver'} onChange={handleLocationTypeChange} />
//         Deliver
//       </label>
//       <label>
//         <input type="radio" value="Pickup" checked={locationType === 'Pickup'} onChange={handleLocationTypeChange} />
//         Pickup
//       </label>

//       {currentLocation && (
//         <StoreList
//           locationType={locationType}
//           latitude={currentLocation.latitude}
//           longitude={currentLocation.longitude}
//         />
//       )}
//     </div>
//   );
// };

// const StoreList = ({ locationType, latitude, longitude }) => {
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:5055/api/store`);
//         const data = await response.json();

//         // Filter stores based on distance from the current location
//         const filteredStores = data.filter(store => {
//           const storeDistance = calculateDistance(latitude, longitude, parseFloat(store.latitude), parseFloat(store.longitude));
//           return storeDistance <= store.radius && (locationType === 'Pickup' || isDeliveryTimeValid(store));
//         });

//         setStores(filteredStores);
//       } catch (error) {
//         console.error('Error fetching store data:', error);
//       }
//     };

//     fetchData();
//   }, [latitude, longitude, locationType]);

//   const isDeliveryTimeValid = (store) => {
//     const now = new Date();
//     const storeOpenTime = new Date(store.storeOpenTime);
//     const storeCloseTime = new Date(store.storeCloseTime);

//     return now >= storeOpenTime && now <= storeCloseTime;
//   };

//   return (
//     <div>
//       <h2>Stores</h2>
//       <ul>
//         {stores.map(store => (
//           <li key={store._id}>
//             {store.storeName} - {store.addressLine}, {store.city}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// };

// const deg2rad = (deg) => {
//   return deg * (Math.PI / 180);
// };

// export default LocationSelection;
// import React, { useState, useEffect } from 'react';

// const LocationSelection = () => {
//   // State variables
//   const [locationType, setLocationType] = useState('Deliver');
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     // Get current user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         position => {
//           setCurrentLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
//         },
//         error => {
//           console.error('Error getting current location:', error);
//         }
//       );
//     } else {
//       console.error('Geolocation is not supported by this browser.');
//     }
//   }, []);

//   // Handle location type change
//   const handleLocationTypeChange = (event) => {
//     setLocationType(event.target.value);
//   };

//   return (
//     <div>
//       <label>
//         <input type="radio" value="Deliver" checked={locationType === 'Deliver'} onChange={handleLocationTypeChange} />
//         Deliver
//       </label>
//       <label>
//         <input type="radio" value="Pickup" checked={locationType === 'Pickup'} onChange={handleLocationTypeChange} />
//         Pickup
//       </label>

//       {currentLocation && (
//         <StoreList
//           locationType={locationType}
//           latitude={currentLocation.latitude}
//           longitude={currentLocation.longitude}
//         />
//       )}
//     </div>
//   );
// };

// const StoreList = ({ locationType, latitude, longitude }) => {
//   // State variables
//   const [stores, setStores] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5055/api/store');
//         const data = await response.json();

//         // Filter and set stores based on distance and type
//         const filteredStores = data.filter(store => {
//           const storeDistance = calculateDistance(latitude, longitude, parseFloat(store.latitude), parseFloat(store.longitude));
//           if (storeDistance <= store.radius && (locationType === 'Pickup' || isDeliveryTimeValid(store))) {
//             return true;
//           }
//           return false;
//         });

//         setStores(filteredStores);
//       } catch (error) {
//         console.error('Error fetching store data:', error);
//       }
//     };

//     fetchData();
//   }, [latitude, longitude, locationType]);

//   // Check if delivery time is valid
// const isDeliveryTimeValid = (store) => {
//   const now = new Date();
//   const currentHour = now.getHours();

//   let storeOpenTimeHour = parseInt(store.storeOpenTime);
//   let storeCloseTimeHour = parseInt(store.storeCloseTime);

//   // Convert store timings to 24-hour format if necessary
//   if (store.storeCloseTime < store.storeOpenTime) {
//     storeCloseTimeHour += 24;
//   }

//   if (currentHour >= storeOpenTimeHour && currentHour <= storeCloseTimeHour) {
//     alert('Order will be prepared and delivered within 30 minutes.');
//     return true;
//   } else {
//     alert('Currently not accepting orders. Store is closed.');
//     return false;
//   }
// };

//   return (
//     <div>
//       <h2>Stores</h2>
//       <ul>
//         {stores.map(store => (
//           <li key={store._id}>
//             {store.storeName} - {store.addressLine}, {store.city}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Calculate distance between two coordinates
// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const R = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const d = R * c; // Distance in km
//   return d;
// };

// // Convert degrees to radians
// const deg2rad = (deg) => {
//   return deg * (Math.PI / 180);
// };

// export default LocationSelection;

import { useState, useEffect } from "react";
import GoogleMaps from "@component/form/GoogleMaps";

const LocationSelection = () => {
  // State variables
  const [locationType, setLocationType] = useState("Deliver");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    // Get current user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    // Fetch store data
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5055/api/store");
        const data = await response.json();
        setStoreData(data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle location type change
  const handleLocationTypeChange = (event) => {
    setLocationType(event.target.value);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  // Convert degrees to radians
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div>
      <label>
        <input
          type="radio"
          value="Deliver"
          checked={locationType === "Deliver"}
          onChange={handleLocationTypeChange}
        />
        Deliver
      </label>
      <label>
        <input
          type="radio"
          value="Pickup"
          checked={locationType === "Pickup"}
          onChange={handleLocationTypeChange}
        />
        Pickup
      </label>

      {currentLocation && storeData.length > 0 && (
        <StoreList
          locationType={locationType}
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          storeData={storeData}
          calculateDistance={calculateDistance}
        />
      )}
    </div>
  );
};

const StoreList = ({
  locationType,
  latitude,
  longitude,
  storeData,
  calculateDistance,
}) => {
  const filteredPickupStores = storeData.filter((store) => {
    const storeDistance = calculateDistance(
      latitude,
      longitude,
      parseFloat(store.latitude),
      parseFloat(store.longitude)
    );
    return storeDistance <= store.radius;
  });

  const isAnyStoreOpenForDelivery = storeData.some((store) => {
    const now = new Date();
    const currentHour = now.getHours();
    const storeOpenTimeHour = parseInt(store.storeOpenTime);
    let storeCloseTimeHour = parseInt(store.storeCloseTime);
    if (storeCloseTimeHour < storeOpenTimeHour) {
      storeCloseTimeHour += 24;
    }
    return (
      locationType === 'Deliver' &&
      currentHour >= storeOpenTimeHour &&
      currentHour <= storeCloseTimeHour
    );
  });

  useEffect(() => {
    if (locationType === 'Deliver' && isAnyStoreOpenForDelivery) {
      const openStores = storeData
        .filter((store) => {
          const now = new Date();
          const currentHour = now.getHours();
          const storeOpenTimeHour = parseInt(store.storeOpenTime);
          let storeCloseTimeHour = parseInt(store.storeCloseTime);
          if (storeCloseTimeHour < storeOpenTimeHour) {
            storeCloseTimeHour += 24;
          }
          return (
            currentHour >= storeOpenTimeHour && currentHour <= storeCloseTimeHour
          );
        })
        .map((store) => store.storeName)
        .join(', ');

      alert(`Order will be prepared in 30 minutes for ${openStores}.`);
    }
  }, [locationType, isAnyStoreOpenForDelivery, storeData]);

  return (
    <div>
      <ul>
          {locationType === "Pickup" && (
          <li>
            <label>
              {/* Select pickup location: */}
              <select onChange={(e) => onLocationSelect(e.target.value)}>
                <option value="">Select location</option>
                {filteredPickupStores.map((store) => (
                  <option key={store._id} value={store._id}>
                    {store.storeName} - {store.addressLine}, {store.city}
                  </option>
                ))}
              </select>
            </label>
          </li>
        )}
        {locationType === 'Deliver' && isAnyStoreOpenForDelivery ? (
          <ul>
            {storeData.map((store) => (
              <li key={store._id}>
                {/* {store.storeName} - {store.addressLine}, {store.city} */}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {locationType === 'Deliver' &&
              !isAnyStoreOpenForDelivery &&
              'No stores available for delivery at this time.'}
          </p>
        )}
      </ul>
    </div>
  );
};

export default LocationSelection;
