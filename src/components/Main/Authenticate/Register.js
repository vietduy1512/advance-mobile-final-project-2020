import React, {useState, useContext} from 'react';
import {Text, TextInput, Button, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Screens} from 'constants';
import {apiRegister} from 'core/services/authenticationService';
import LayoutSpinner from 'components/Common/LayoutSpinner';
import {LoadingContext} from 'context';

const Login = ({navigation}) => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const {setLoading} = useContext(LoadingContext);

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const register = () => {
    if (!form.username || !form.email || !form.phone || !form.password) {
      setErrorMessage('Please fill all input above!');
      return;
    }

    setLoading(true);
    apiRegister(form)
      .then(() => {
        navigation.navigate(Screens.LOGIN);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage('Something went wrong!');
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <View style={styles.container}>
      <LayoutSpinner />
      <View style={styles.logoIconContainer}>
        <Image source={require('assets/images/e-learning-logo.jpg')} style={styles.logoIcon} />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Input your username"
          style={styles.textInput}
          value={form.username}
          onChangeText={value => handleChange('username', value)}
        />
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
        <Text style={styles.label}>Phone</Text>
        <TextInput
          placeholder="Input your phone number"
          style={styles.textInput}
          value={form.phone}
          onChangeText={value => handleChange('phone', value)}
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
        <Button title="Register" onPress={register}/>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => {
          navigation.navigate(Screens.LOGIN);
        }}>
          <Text style={{color: 'blue'}}>{`Back to Login`}</Text>
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 20, marginHorizontal: 40, color: 'red', fontSize: 16, alignSelf: 'center'}}>
        {errorMessage}
      </Text>
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
  navigation: {
    marginTop: 20,
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
