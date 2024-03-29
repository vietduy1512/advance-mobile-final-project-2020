import axios from "axios";
import { AsyncStorage } from "react-native";
import { Screens } from "constants";
import * as RootNavigation from './rootNavigation';

axios.defaults.baseURL = 'https://api.itedu.me';

axios.interceptors.request.use(
  async function (config) {
    const token = await AsyncStorage.getItem("access_token");
    console.log("[Request] " + config.url);
    config.headers["Authorization"] = "Bearer " + token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    return response;
  },
  async function (error) {
    console.log(`[Response][Error] ${error.response.config.url} - ${error.response.status} - ${error.response.data.message}`);
    if (error.response.status === 401) {
      await AsyncStorage.removeItem("user_info");
      await AsyncStorage.removeItem("access_token");
      RootNavigation.navigate(Screens.LOGIN);
    }
    return Promise.reject(error);
  }
);
