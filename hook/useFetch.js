import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const randomAPIKey = [
    "cc12130b11mshce226768cb27c01p182cf1jsna3b27b757fdd",
    "c5f3d3fb38msh059149ed94e03a0p1d88f0jsn2922f1148a79",
    "818cc9083bmshf62caea85e4569fp1043ffjsn2e9b3a96c50e",
    "60e0434596mshf341497e195838ep190f73jsn70179698a6b5",
  ];

  const current_key = Math.floor(Math.random() * 4);
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": randomAPIKey[current_key],
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
    } catch (error) {
      setError(error);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;
