import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ListCoursesBody from '../../../Courses/ListCourses/ListCoursesBody';

const DownloadListCourses = (props) => {
  const renderDownloadHeader = ({section: {title}}) => (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.removeAllBtnContainer}>
        <Text style={styles.removeAllBtn}>Remove all</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ListCoursesBody
      {...props}
      renderHeader={renderDownloadHeader}
    />
  );
}

export default DownloadListCourses;

const styles = StyleSheet.create({
  title: {
    fontSize: 17
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20
  },
  removeAllBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  removeAllBtn: {
    color: 'red',
    fontSize: 11
  }
});
