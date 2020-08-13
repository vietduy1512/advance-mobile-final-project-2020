import React, { useState, useEffect, useContext } from "react";
import { Text, Button, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Screens } from "constants";
import { AuthenticationContext } from "config/context";
import { LoadingContext } from "config/context";
import InputField from "components/Common/InputField";
import validator from "validator";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "vietduy1512+001@gmail.com",
    password: "P@ssw0rd",
  });
  const [dirty, setDirty] = useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const authContext = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoadingContext);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
    setDirty({
      ...dirty,
      [name]: true,
    });
  };

  useEffect(() => {
    setLoading(true);
    authContext.init().finally(() => {
      setLoading(false);
      if (authContext.state.isAuthenticated) {
        navigation.navigate(Screens.LAYOUT);
      }
    });
  }, []);

  useEffect(() => {
    if (authContext.state.isAuthenticated) {
      navigation.navigate(Screens.LAYOUT);
    }
  }, [authContext.state.isAuthenticated]);

  const login = () => {
    if (!form.email || !form.password) {
      setErrorMessage("Please fill all input above!");
      return;
    }
    setErrorMessage("");

    setLoading(true);
    authContext.login(form.email, form.password).finally(() => {
      console.log("Login succeed!");
      navigation.navigate(Screens.LAYOUT);
      setLoading(false);
    });
  };

  
  const isValidEmail = () => {
    return validator.isEmail(form.email);
  };

  const isValidPassword = () => {
    return validator.isLength(form.password, { min: 4 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoIconContainer}>
        <Image
          source={require("assets/images/e-learning-logo.jpg")}
          style={styles.logoIcon}
        />
      </View>
      <InputField
        title="Email"
        error="Email is invalid"
        dirty={dirty.email}
        validation={isValidEmail}
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <InputField
        title="Password"
        error="Password at least 4 characters"
        dirty={dirty.password}
        validation={isValidPassword}
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry={true}
      />
      <View style={styles.submit}>
        <Button title="Login" onPress={login} />
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.REGISTER);
          }}
        >
          <Text
            style={{ color: "blue" }}
          >{`Don't have account? Sign up here`}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Screens.FORGOT_PASSWORD);
          }}
        >
          <Text
            style={{ color: "blue" }}
          >{`Forget your password?`}</Text>
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
        {errorMessage || authContext.state.errorMessage}
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
