import React from 'react';
import { Text, View, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import ListCoursesItem from '../ListCoursesItem/ListCoursesItem';

const DownloadListCourses = (props) => {
  return (
    <View>
      <SectionList
        sections={props.courses}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ListCoursesItem item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.removeAllBtnContainer}>
              <Text style={styles.removeAllBtn}>Remove all</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
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
