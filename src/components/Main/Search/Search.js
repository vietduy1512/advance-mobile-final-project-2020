import React, {useState, useContext} from 'react';
import { StyleSheet, ScrollView, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Constants from "expo-constants";
import SearchListCourses from './ListCourses/SearchListCourses';
import SearchListPaths from './ListPaths/SearchListPaths';
import SearchListAuthors from './ListAuthors/SearchListAuthors';
import { Titles } from 'constants'
import {MockupDataContext} from 'context';
import { Tab, Tabs, TabHeading, View } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

const Search = () => {
  const {courses, paths, authors} = useContext(MockupDataContext);
  const [searchCourses, setSearchCourses] = useState([]);
  const [searchPaths, setSearchPaths] = useState([]);
  const [searchAuthors, setSearchAuthors] = useState([]);

  const AllSection = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.sectioncontainer}
    >
      <SearchListCourses title={Titles.COURSES} courses={searchCourses} />
      <SearchListPaths title={Titles.PATHS} paths={searchPaths} />
      <SearchListAuthors title={Titles.AUTHORS} authors={searchAuthors} />
    </ScrollView>
  )

  const Header = () => {
    const [searchText, setSearchText] = useState("");

    const onSubmitEditing = () => {
      let newCourses = courses.filter(course => course.title.includes(searchText));
      let newPaths = paths.filter(path => path.title.includes(searchText));
      let newAuthors = authors.filter(author => author.name.includes(searchText));
      setSearchCourses(newCourses);
      setSearchPaths(newPaths);
      setSearchAuthors(newAuthors);
      setSearchText("");
    }

    return (
      <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', marginHorizontal: 10, }}>
        <View style={{ flex: 4, margin: 5, borderRadius: 5, backgroundColor: 'lightgray', alignItems: 'center', flexDirection: 'row' }}>
          <Ionicons style={{ flex: 1, marginLeft: 5 }} name="md-search" size={20} color="black" />
          <TextInput
            style={{ flex: 8 }}
            onChangeText={text => setSearchText(text)}
            onSubmitEditing={onSubmitEditing}
            value={searchText}
          />
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="md-close-circle" size={20} color="gray" onPress={() => setSearchText("")} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
          Keyboard.dismiss();
          setSearchText("");
        }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Header />
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'blue'}} >
        <Tab heading={
          <TabHeading style={{backgroundColor: 'white'}}>
            <Text>All</Text>
          </TabHeading>
        }>
          <AllSection />
        </Tab>
        <Tab 
          heading={
            <TabHeading style={{backgroundColor: 'white'}}>
              <Text>Courses</Text>
            </TabHeading>
        }>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListCourses title={Titles.COURSES} courses={searchCourses} isRenderSection={true} />
          </ScrollView>
        </Tab>
        <Tab
          style={styles.sectioncontainer}
          heading={
            <TabHeading style={{backgroundColor: 'white'}}>
              <Text>Paths</Text>
            </TabHeading>
        }>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListPaths title={Titles.PATHS} paths={searchPaths} isRenderSection={true} />
          </ScrollView>
        </Tab>
        <Tab
          style={styles.sectioncontainer}
          heading={
            <TabHeading style={{backgroundColor: 'white'}}>
              <Text>Authors</Text>
            </TabHeading>
        }>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListAuthors title={Titles.AUTHORS} authors={searchAuthors} isRenderSection={true} />
          </ScrollView>
        </Tab>
      </Tabs>
    </View>
  );
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  sectioncontainer: {
    marginHorizontal: 10,
  },
});
