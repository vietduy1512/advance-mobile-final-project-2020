import React, { useState, useEffect, useContext } from "react";
import { Text, TextInput, Button, View, Image, StyleSheet, AsyncStorage } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Screens } from "constants";
import { AuthenticationContext } from "config/context";
import { LoadingContext } from "config/context";
import LayoutSpinner from "components/Common/LayoutSpinner";

const Login = ({ navigation }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState(null);
  const authContext = useContext(AuthenticationContext);
  const { setLoading } = useContext(LoadingContext);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const fetchAccessToken = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      setToken(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAccessToken();
  }, [])

  useEffect(() => {
    if (token || authContext.state.isAuthenticated) {
      console.log("Login succeed!");
      navigation.navigate(Screens.LAYOUT);
    }
  }, [token, authContext.state.isAuthenticated]);

  const login = () => {
    if (!form.email || !form.password) {
      setErrorMessage("Please fill all input above!");
      return;
    }
    setErrorMessage("");

    setLoading(true);
    authContext.login(form.email, form.password).finally(() => {
      setLoading(false);
    });
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
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Input your email"
          style={styles.textInput}
          value={form.email}
          onChangeText={(value) => handleChange("email", value)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Input your password"
          style={styles.textInput}
          value={form.password}
          onChangeText={(value) => handleChange("password", value)}
        />
      </View>
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
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  submit: {
    width: 100,
    alignSelf: "center",
  },
  navigation: {
    marginTop: 20,
    alignSelf: "center",
  },
  label: {
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: "gray",
    borderWidth: 1,
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
