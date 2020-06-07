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
  const {courses, paths, authors, recentSearches} = useContext(MockupDataContext);
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
      let newCourses = courses.filter(course => course.title.toLowerCase().includes(searchText.toLowerCase()));
      let newPaths = paths.filter(path => path.title.toLowerCase().includes(searchText.toLowerCase()));
      let newAuthors = authors.filter(author => author.name.toLowerCase().includes(searchText.toLowerCase()));
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
          setSearchCourses([]);
          setSearchPaths([]);
          setSearchAuthors([]);
          setSearchText("");
        }}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        
      </View>
    )
  }

  const SearchContent = () => (
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
  )

  const RecentSearches = () => {

    const Searches = ({content}) => {
      const onSubmit = () => {
        let newCourses = courses.filter(course => course.title.toLowerCase().includes(content.toLowerCase()));
        let newPaths = paths.filter(path => path.title.toLowerCase().includes(content.toLowerCase()));
        let newAuthors = authors.filter(author => author.name.toLowerCase().includes(content.toLowerCase()));
        setSearchCourses(newCourses);
        setSearchPaths(newPaths);
        setSearchAuthors(newAuthors);
      }
      return (
        <TouchableOpacity
          style={{ marginLeft: 15, height: 30, borderRadius: 5, alignItems: 'center', flexDirection: 'row' }}
          onPress={onSubmit}
        >
          <Ionicons style={{ flex: 1 }} name="md-search" size={20} color="black" />
          <Text style={{ flex: 11 }}>
            {content}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={{...styles.title}}>Recent searches</Text>
          <TouchableOpacity style={styles.clearBtnContainer}>
            <Text style={styles.clearBtn}>Remove all</Text>
          </TouchableOpacity>
        </View>
        {recentSearches.map((content, index) => <Searches key={index} content={content} />)}
      </View>
    )
  }

  let isSearched = searchCourses.length !== 0 || searchPaths.length !== 0 || searchAuthors.length !== 0;

  return (
    <View style={styles.container}>
      <Header />
        {isSearched ? <SearchContent /> : <RecentSearches />}
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
  title: {
    fontWeight: 'bold'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 15
  },
  clearBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearBtn: {
    color: 'blue',
    fontSize: 11
  }
});
