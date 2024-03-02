import axios from "axios";
import { useEffect, useState } from "react";
import { API } from "../utils/api";



const useFetch = (endpoint) => {
  const [dataState, setDataState] = useState({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API+ endpoint);
        if (response.data.success) {
          setDataState({
            data: response,
            isLoading: false,
            isError: false,
            error: null,
          });
        } else {
          setDataState({
            data: response,
            isLoading: false,
            isError: true,
            error: "Something went wrong",
          });
        }
      } catch (error) {
        console.log(error);
        setDataState({
          data: null,
          isLoading: false,
          isError: true,
          error: error,
        });
      }
    };

    fetchData();
  }, [endpoint]);

  return dataState;
};

export default useFetch;
