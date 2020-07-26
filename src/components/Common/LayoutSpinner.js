import React, { useContext } from 'react';
import { Spinner } from 'native-base';
import { View, StyleSheet } from 'react-native';
import {LoadingContext} from 'context';

const LayoutSpinner = () => {
  const {loading} = useContext(LoadingContext);
  return loading
    ? (<>
      <View style={styles.backgroundSpinner}></View>
      <Spinner size={100} style={styles.spinner} />
    </>)
    : null;
}

export default LayoutSpinner;

const styles = StyleSheet.create({
  backgroundSpinner: {
    position: 'absolute',
    zIndex: 1,
    opacity: 0.3,
    backgroundColor: 'grey',
    width: '100%',
    height: '100%'
  },
  spinner: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '100%'
  }
});