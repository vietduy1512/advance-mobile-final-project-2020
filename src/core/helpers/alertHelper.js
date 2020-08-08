import { Alert } from "react-native";

export const alertError = (error) => {
  Alert.alert("Alert", error.response.data.message);
};

export const alertSuccess = (message) => {
  Alert.alert(message);
};
