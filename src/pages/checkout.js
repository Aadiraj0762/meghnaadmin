import React from "react";
import dynamic from "next/dynamic";
import { CardElement } from "@stripe/react-stripe-js";
import Link from "next/link";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import { useContext, useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete, Marker } from "@react-google-maps/api";

//internal import
import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
// import InputShipping from "@component/form/InputShipping";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import useTranslation from "next-translate/useTranslation";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import LocationSelector from "../component/form/LocationSelector"
const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    couponInfo,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    currency,
    isCheckoutSubmit,
    shippingOption,
  } = useCheckoutSubmit();
  const [selectedOption, setSelectedOption] = useState({
    value: 'Deliver',
    label: 'Delivery Selected',
  });

  const handleShippingOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption({
      value,
      // label: value === 'Pickup' ? 'Pickup Selected' : 'Delivery Selected',
    });
    console.log(value);
  };
  
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const [store, setStore]=useState(null);
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState({
    addressLine: "",
    city: "",
    country: "",
    zipCode: "",
  });

  // rest of the component code  const [storeData, setStoreData] = useState([]);
  const [locationType, setLocationType] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

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

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.value);
    if (e.target.value === "Deliver") {
      checkStoreAvailability();
    }
  };
  
  const checkStoreAvailability = () => {
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const openStores = storeData.filter((store) => {
      const storeOpenTime = new Date(currentTime);
      storeOpenTime.setHours(parseInt(store.storeOpenTime));
      storeOpenTime.setMinutes(11); // Assuming opening time always has 11 minutes

      const storeCloseTime = new Date(currentTime);
      storeCloseTime.setHours(parseInt(store.storeCloseTime));
      storeCloseTime.setMinutes(6); // Assuming closing time always has 6 minutes

      return (
        (storeOpenTime <= currentTime && currentTime <= storeCloseTime) ||
        (storeOpenTime <= currentTime &&
          currentTime <=
            storeCloseTime.setMinutes(storeCloseTime.getMinutes() + 30))
      );
    });

    if (openStores.length > 0) {
      setAlertMessage(
        `Order will be prepared soon at ${openStores
          .map((store) => store.storeName)
          .join(", ")}!`
      );
    } else {
      setAlertMessage("No store available for delivery!");
    }
  };
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };
  
  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new google.maps.Map(document.getElementById("map-container"), {
        center: { lat: 20.5937, lng: 78.9629 }, // India coordinates
        zoom: 5,
      });

      const geocoder = new google.maps.Geocoder();
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search location...";
      const searchBox = new google.maps.places.SearchBox(input);
      mapInstance.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      const initialMarker = new google.maps.Marker({
        position: { lat: 20.5937, lng: 78.9629 },
        map: mapInstance,
        draggable: true,
      });

      initialMarker.addListener("dragend", () => {
        const position = initialMarker.getPosition();
        updateLocationDetails(position.lat(), position.lng());
      });

      setMarker(initialMarker);

      mapInstance.addListener("bounds_changed", () => {
        searchBox.setBounds(mapInstance.getBounds());
      });

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
        if (places.length === 0) {
          return;
        }

        const bounds = new google.maps.LatLngBounds();
        places.forEach((place) => {
          if (!place.geometry || !place.geometry.location) {
            return;
          }

          if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }

          initialMarker.setPosition(place.geometry.location);
          updateLocationDetails(place.geometry.location.lat(), place.geometry.location.lng());
        });

        mapInstance.fitBounds(bounds);
      });

      setMap(mapInstance);
    };

    const updateLocationDetails = (lat, lng) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const addressComponents = results[0].address_components;
          const addressDetails = {
            addressLine: results[0].formatted_address,
            city: "",
            state: "",
            pincode: "",
          };

          addressComponents.forEach((component) => {
            const types = component.types;
            if (types.includes("locality")) {
              addressDetails.city = component.long_name;
            }
            if (types.includes("administrative_area_level_1")) {
              addressDetails.state = component.long_name;
            }
            if (types.includes("postal_code")) {
              addressDetails.pincode = component.long_name;
            }
          });

          document.getElementById("address-line").value = addressDetails.addressLine || "";
          document.getElementById("city").value = addressDetails.city || "";
          document.getElementById("state").value = addressDetails.state || "";
          document.getElementById("pincode").value = addressDetails.pincode || "";

          fetch("http://127.0.0.1:5055/api/store")
            .then((response) => response.json())
            .then((stores) => {
              const nearbyStores = stores.filter((store) => {
                const storeLocation = {
                  latitude: parseFloat(store.latitude),
                  longitude: parseFloat(store.longitude),
                };

                const distance = calculateDistance({ latitude: lat, longitude: lng }, storeLocation);
                return distance <= 6;
              });

              console.log("Nearby Stores:", nearbyStores);
              const storeNames = nearbyStores.map((store) => store.storeName);
            })
            .catch((error) => {
              console.error("Error fetching store data:", error);
            });
        }
      });
    };

    function calculateDistance(location1, location2) {
      const earthRadius = 6371;
      const latDiff = deg2rad(location2.latitude - location1.latitude);
      const lngDiff = deg2rad(location2.longitude - location1.longitude);
      const a =
        Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
        Math.cos(deg2rad(location1.latitude)) *
          Math.cos(deg2rad(location2.latitude)) *
          Math.sin(lngDiff / 2) *
          Math.sin(lngDiff / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadius * c;
    }

    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }

    loadScript(`https://maps.googleapis.com/maps/api/js?key=AIzaSyBbfnvObzwcs6OLXOmSaG9CtIhwjmBwLTQ&libraries=places`)
      .then(() => {
        initializeMap();
      })
      .catch((error) => {
        console.error("Error loading Google Maps script:", error);
      });

    return () => {
      if (map) {
        // No need to remove the map as Google Maps API doesn't support it
      }
    };
  }, []);

  // useEffect(() => {
  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoiYWFkaTc2MiIsImEiOiJjbHZtMWM2aW0ybWFkMnZuMXg5YXR3djljIn0.vUj8hLhZWeAYIB07k9KMyA";
  //   const initializeMap = () => {
  //     const mapInstance = new mapboxgl.Map({
  //       container: "map-container",
  //       style: "mapbox://styles/mapbox/streets-v11",
  //       center: [78.9629, 20.5937], // India coordinates
  //       zoom: 5,
  //     });

  //     mapInstance.addControl(
  //       new MapboxGeocoder({
  //         accessToken: mapboxgl.accessToken,
  //         mapboxgl: mapboxgl,
  //         countries: "IN",
  //       })
  //     );

  //     mapInstance.addControl(new mapboxgl.NavigationControl(), "bottom-right");

  //     mapInstance.addControl(
  //       new mapboxgl.GeolocateControl({
  //         positionOptions: {
  //           enableHighAccuracy: true,
  //         },
  //         trackUserLocation: true,
  //       })
  //     );

  //     mapInstance.on("moveend", () => {
  //       const { lng, lat } = mapInstance.getCenter();
  //       fetch(
  //         `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
  //       )
  //         .then((response) => response.json())
  //         .then((data) => {
  //           const userLatitude = lat;
  //           const userLongitude = lng;
  //           const userLocation = {
  //             latitude: userLatitude,
  //             longitude: userLongitude,
  //           };

  //           // Log entire data including latitude and longitude
  //           console.log("Geocoding data:", data);

  //           // Process address details
  //           const addressComponents = data.features[0].context || [];
  //           const addressDetails = {
  //             addressLine: "",
  //             city: "",
  //             state: "",
  //             pincode: "",
  //           };
  //           addressComponents.forEach((component) => {
  //             switch (component.id.split(".")[0]) {
  //               case "place":
  //                 addressDetails.city = component.text;
  //                 break;
  //               case "region":
  //                 addressDetails.state = component.text;
  //                 break;
  //               case "postcode":
  //                 addressDetails.pincode = component.text;
  //                 break;
  //             }
  //           });
  //           addressDetails.addressLine = data.features[0].place_name
  //             .split(",")
  //             .slice(0, -3)
  //             .join(",");
  //           document.getElementById("address-line").value =
  //             addressDetails.addressLine || "";
  //           document.getElementById("city").value = addressDetails.city || "";
  //           document.getElementById("state").value = addressDetails.state || "";
  //           document.getElementById("pincode").value =
  //             addressDetails.pincode || "";

  //           // Fetch store data
  //           fetch("http://127.0.0.1:5055/api/store")
  //             .then((response) => response.json())
  //             .then((stores) => {
  //               // Filter stores within 6km
  //               const nearbyStores = stores.filter((store) => {
  //                 const storeLocation = {
  //                   latitude: parseFloat(store.latitude),
  //                   longitude: parseFloat(store.longitude),
  //                 };

  //                 // Calculate distance between user and store
  //                 const distance = calculateDistance(
  //                   userLocation,
  //                   storeLocation
  //                 );

  //                 // Filter stores within 6km
  //                 return distance <= 6;
  //               });

  //               // Log nearby stores
  //               console.log("Nearby Stores:", nearbyStores);

  //               // Alert store names
  //               const storeNames = nearbyStores.map((store) => store.storeName);
  //               // alert(`Nearby stores within 6km: ${storeNames.join(", ")}`);
  //             })
  //             .catch((error) => {
  //               console.error("Error fetching store data:", error);
  //             });
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching geocoding data:", error);
  //         });
  //     });

  //     // Function to calculate distance between two locations (in km)
  //     function calculateDistance(location1, location2) {
  //       const earthRadius = 6371; // Radius of the Earth in km
  //       const latDiff = deg2rad(location2.latitude - location1.latitude);
  //       const lngDiff = deg2rad(location2.longitude - location1.longitude);
  //       const a =
  //         Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
  //         Math.cos(deg2rad(location1.latitude)) *
  //           Math.cos(deg2rad(location2.latitude)) *
  //           Math.sin(lngDiff / 2) *
  //           Math.sin(lngDiff / 2);
  //       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //       const distance = earthRadius * c;
  //       return distance;
  //     }

  //     // Function to convert degrees to radians
  //     function deg2rad(deg) {
  //       return deg * (Math.PI / 180);
  //     }

  //     setMap(mapInstance);
  //   };

  //   if (!map) {
  //     initializeMap();
  //   }

  //   return () => {
  //     if (map) {
  //       map.remove();
  //     }
  //   };
  // }, [map]);
  const [storeData, setStoreData] = useState([]);

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
  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form
                  onSubmit={handleSubmit((data) =>
                    submitHandler(data, selectedOption)
                  )}
                >
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01. {t("common:personalDetails")}
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:firstName")}
                          name="firstName"
                          type="text"
                          placeholder="John"
                        />
                        <Error errorName={errors.firstName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:lastName")}
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                        />
                        <Error errorName={errors.lastName} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:emailAddress")}
                          name="email"
                          type="email"
                          placeholder="youremail@gmail.com"
                        />
                        <Error errorName={errors.email} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:phoneNumber")}
                          name="contact"
                          type="tel"
                          placeholder="+062-6532956"
                        />

                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mt-12">
                    {/* <LocationSelector/> */}
        <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
          02. {t("Service Mode Type")}
        </h2>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
              <label className="cursor-pointer label">
                <div className="flex item-center justify-between">
                  <div className="flex items-center">
                    <h6 className="font-serif font-medium text-sm text-gray-600">
                      Delivery
                    </h6>
                  </div>
                  <input
                    name="shippingOption"
                    type="radio"
                    className="form-radio outline-none focus:ring-0 text-emerald-500"
                    value="Deliver"
                    checked={selectedOption.value === "Deliver"}
                    onChange={handleShippingOptionChange}
                  />
                </div>
              </label>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <div className="px-3 py-4 card border border-gray-200 bg-white rounded-md">
              <label className="cursor-pointer label">
                <div className="flex item-center justify-between">
                  <div className="flex items-center">
                    <h6 className="font-serif font-medium text-sm text-gray-600">
                      Pickup
                    </h6>
                  </div>
                  <input
                    name="shippingOption"
                    type="radio"
                    className="form-radio outline-none focus:ring-0 text-emerald-500"
                    value="Pickup"
                    checked={selectedOption.value === "Pickup"}
                    onChange={handleShippingOptionChange}
                  />
                </div>
              </label>
            </div>
          </div>
        </div>
        {selectedOption.value === "Pickup" && (
        <li style={{listStyle:"none"}}>
          <label>
            <select onChange={(e) => (e.target.value)}>
              <option value="">Select location</option>
              {storeData.map((store) => (
                <option key={store._id} value={store._id}>
                  {store.storeName} - {store.addressLine}, {store.city}
                </option>
              ))}
            </select>
            
          </label>
        </li>
      )}
        {selectedOption.label && <div>{selectedOption.label}</div>}
      </div>
      {selectedOption.value !== "Pickup" && (
        <div id="location-address" className="form-group mt-12">
          <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
            03. {t("Addresss Details")}
          </h2>
          <div className="grid grid-cols-6 gap-6 mb-8">
            <div className="col-span-6">
              <input
                register={register}
                label={t("common:streetAddress")}
                name="user_info.address"
                id="address-line"
                type="text"
                placeholder="123 Boulevard Rd, Beverley Hills"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                defaultValue={currentLocation?.addressLine || ""}
              />
              <Error errorName={errors.address} />
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <input
                register={register}
                label={t("common:city")}
                name="user_info.city"
                id="city"
                type="text"
                placeholder="Los Angeles"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                defaultValue={currentLocation?.city || ""}
              />
              <Error errorName={errors.city} />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <input
                register={register}
                label="Country"
                name="country"
                id="state"
                type="text"
                placeholder="United States"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                defaultValue={currentLocation?.country || ""}
              />
              <Error errorName={errors.country} />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <input
                register={register}
                label={t("common:zIPPostal")}
                name="zipCode"
                id="pincode"
                type="text"
                placeholder="2345"
                className="py-2 px-4 md:px-5 w-full appearance-none border text-sm opacity-75 text-input rounded-md placeholder-body min-h-12 transition duration-200 focus:ring-0 ease-in-out bg-white border-gray-200 focus:outline-none focus:border-emerald-500 h-11 md:h-12"
                defaultValue={currentLocation?.zipCode || ""}
              />
              <Error errorName={errors.zipCode} />
            </div>
          </div>
          <div id="map-container" className="h-96" />
          <br />
        </div>
      )}

                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      04. {t("common:paymentDetails")}
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:cashOnDelivery")}
                          value="Cash"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:creditCard")}
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link href="/">
                        <a className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          {t("common:continueShoppingBtn")}
                        </a>
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        disabled={isEmpty || !stripe || isCheckoutSubmit}
                        className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {t("common:confirmOrderBtn")}{" "}
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {t("common:orderSummary")}
                </h2>

                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} currency={currency} />
                  ))}

                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {couponInfo.couponCode ? (
                      <span className="bg-emerald-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        {" "}
                        <p className="text-emerald-600">Coupon Applied </p>{" "}
                        <span className="text-red-500 text-right">
                          {couponInfo.couponCode}
                        </span>
                      </span>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder={t("common:couponCode")}
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                          onClick={handleCouponCode}
                          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                          {t("common:applyBtn")}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:subtotal")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {cartTotal?.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:shippingCost")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    {currency}
                    {shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:discount")}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    {currency}
                    {discountAmount.toFixed(2)}
                  </span>
                </div>
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {t("common:totalCost")}
                    <span className="font-serif font-extrabold text-lg">
                      {currency}
                      {parseFloat(total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
