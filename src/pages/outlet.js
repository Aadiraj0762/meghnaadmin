import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { FaMapMarkerAlt,FaPhoneAlt,FaFacebookF,FaInstagram,FaTwitter,FaPinterest,FaYoutube, FaEnvelope} from "react-icons/fa";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, CardDeck, Accordion } from 'react-bootstrap';
const CardTwo = () => {
  const { t } = useTranslation();
  const [stores, setStores] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5055/api/store")
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-center p-6">
      {stores.map((store, index) => (
        <div
          key={index}
          className="bg-white shadow-sm rounded-lg flex flex-col justify-center items-center p-6 w-full md:w-1/2 lg:w-full xl:w-full"
        >
          <h2 className="text-lg font-bold">{store.storeName}</h2>
          
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-lg">
            <img
              src={store.storeImage[0]}
              alt="store image"
              className="w-full h-48 md:h-56 lg:h-64 xl:h-64 object-cover rounded-lg"
            />
          </div>
  
          <div className="mt-4">
            <span className="font-serif flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {store.addressLine}, {store.city}, {store.state} {store.pinCode}
            </span>
            <span className="font-serif flex items-center">
              <FaPhoneAlt className="mr-2" />
              {store.landline}
            </span>
            <span className="font-serif flex items-center">
              <FaEnvelope className="mr-2" />
              {store.user}
            </span>
          </div>
  
          <ul className="flex mt-4">
            <li className="mx-2">
              <a href="#" className="flex items-center text-gray-800">
                <FaFacebookF className="mr-2" />
                {/* <span className="font-serif">Facebook</span> */}
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="flex items-center text-gray-800">
                <FaTwitter className="mr-2" />
                {/* <span className="font-serif">Twitter</span> */}
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="flex items-center text-gray-800">
                <FaInstagram className="mr-2" />
                {/* <span className="font-serif">Instagram</span> */}
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="flex items-center text-gray-800">
                <FaPinterest className="mr-2" />
                {/* <span className="font-serif">Pinterest</span> */}
              </a>
            </li>
            <li className="mx-2">
              <a href="#" className="flex items-center text-gray-800">
                <FaYoutube className="mr-2" />
                {/* <span className="font-serif">Youtube</span> */}
              </a>
            </li>
          </ul>
          
        </div>
      ))}
    </div>
  );
};

export default CardTwo;
