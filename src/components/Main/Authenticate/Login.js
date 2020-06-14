import React, {useState} from 'react';
import {Text, TextInput, Button, View, Image, StyleSheet} from 'react-native';
import {Screens} from 'constants';

const Login = ({navigation}) => {
  const [form, setForm] = useState({
    email: 'vietduy1512@gmail.com',
    password: '123456',
  });

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoIconContainer}>
        <Image source={require('assets/images/e-learning-logo.jpg')} style={styles.logoIcon} />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Input your email"
          style={styles.textInput}
          value={form.email}
          onChangeText={value => handleChange('email', value)}
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Input your password"
          style={styles.textInput}
          value={form.password}
          onChangeText={value => handleChange('password', value)}
        />
      </View>
      <View style={styles.submit}>
        <Button title="Login" onPress={() => navigation.navigate(Screens.LAYOUT)} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  submit: {
    width: 100,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold'
  },
  textInput: {
    height: 40,
    borderRadius: 10,
    paddingLeft: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  logoIconContainer: {
    height: 100,
    width: 200,
    alignSelf: 'center'
  },
  logoIcon: {
    flex: 1,
    height: undefined,
    width: undefined
  },
});
