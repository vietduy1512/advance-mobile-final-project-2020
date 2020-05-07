import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Download = () => {
  return (
    <View style={styles.container}>
      <Text>Download!</Text>
    </View>
  );
}

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
