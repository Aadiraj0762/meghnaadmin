// utils/mapUtils.js

const API_BASE_URL = "https://api.dotpe.in/api/location/maps/v1/";

export const fetchStoreData = async () => {
  const apiKey = "AIzaSyDopoI1Gj8swr1i9bvcu4IvS-8rL-hYKSo";
  try {
    const response = await fetch(`${API_BASE_URL}${apiKey}?app=FE`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching store data:", error);
    return null;
  }
};
