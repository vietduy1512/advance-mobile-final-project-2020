import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const EmptyPage = () => {
  return (
    <View style={styles.container}>
      <Text>Its empty!</Text>
    </View>
  );
}

export default EmptyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
