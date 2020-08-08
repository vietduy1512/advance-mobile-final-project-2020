import React, { useState, useContext } from "react";
import { Text, Button, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Screens } from "constants";
import { LoadingContext } from "config/context";
import LayoutSpinner from "components/Common/LayoutSpinner";
import InputField from "components/Common/InputField";
import validator from "validator";
import { forgotPassword } from "core/services/usersService";
import { alertSuccess } from "core/helpers/alertHelper";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [dirty, setDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading } = useContext(LoadingContext);

  const handleChange = (value) => {
    setEmail(value);
    setDirty(true);
  };

  const submit = () => {
    if (!email) {
      setErrorMessage("Please fill all input above!");
      return;
    }
    setErrorMessage("");

    setLoading(true);
    forgotPassword(email)
      .then(() => {
        navigation.navigate(Screens.LOGIN);
        alertSuccess("Send forgot password email successfully");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isValidEmail = () => {
    return validator.isEmail(email);
  };

  return (
    <View style={styles.container}>
      <LayoutSpinner />
      <View style={styles.logoIconContainer}>
        <Image
          source={require("assets/images/e-learning-logo.jpg")}
          style={styles.logoIcon}
        />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginBottom: 20,
          fontSize: 20,
          alignSelf: "center",
        }}
      >
        Input email to reset your password
      </Text>
      <InputField
        title="Email"
        error="Email is invalid"
        dirty={dirty}
        validation={isValidEmail}
        value={email}
        onChangeText={(value) => handleChange(value)}
      />
      <View style={styles.submit}>
        <Button title="Submit" onPress={submit} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.LOGIN);
          }}
        >
          <Text style={{ color: "blue" }}>{`Back to Login`}</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 40,
          color: "red",
          fontSize: 16,
          alignSelf: "center",
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  submit: {
    width: 100,
    alignSelf: "center",
  },
  navigation: {
    marginTop: 20,
    alignSelf: "center",
  },
  logoIconContainer: {
    height: 100,
    width: 200,
    alignSelf: "center",
  },
  logoIcon: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
});
