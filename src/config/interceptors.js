import axios from "axios";
import { AsyncStorage } from "react-native";

axios.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("access_token");
    console.log("Access token: " + token);
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
