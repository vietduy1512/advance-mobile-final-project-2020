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
import {ThemeContext} from 'context';
import {getAllCategories} from 'core/services/categoriesService';
import {getAllAuthors} from 'core/services/authorsService';
import {searchCourse} from 'core/services/coursesService';
import {LoadingContext} from 'context';

const Search = () => {
  const {setLoading} = useContext(LoadingContext);
  const {theme} = useContext(ThemeContext);
  const {recentSearches} = useContext(MockupDataContext);
  const [searchCourses, setSearchCourses] = useState([]);
  const [searchPaths, setSearchPaths] = useState([]);
  const [searchAuthors, setSearchAuthors] = useState([]);

  const searchData = (text) => {
    setLoading(true);
    Promise.all([searchCourse(text), getAllCategories(), getAllAuthors()])
      .then(([coursesRes, categoriesRes, authorsRes]) => {
        let courses = coursesRes.data.payload.rows;
        let newPaths = categoriesRes.data.payload.filter(path => path.name.toLowerCase().includes(text.toLowerCase()));
        let newAuthors = authorsRes.data.payload.filter(author => author['user.name'].toLowerCase().includes(text.toLowerCase()));
        
        setSearchCourses(courses);
        setSearchPaths(newPaths);
        setSearchAuthors(newAuthors);
        setLoading(false);
      });
  }

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
      searchData(searchText);
      setSearchText("");
    }

    return (
      <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, }}>
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
      <Tab
        style={{...styles.sectioncontainer, backgroundColor: theme.backgroundColor}}
        heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>All</Text>
          </TabHeading>
      }>
        <AllSection />
      </Tab>
      <Tab
        style={{...styles.sectioncontainer, backgroundColor: theme.backgroundColor}}
        heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>Courses</Text>
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
        style={{...styles.sectioncontainer, backgroundColor: theme.backgroundColor}}
        heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>Paths</Text>
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
        style={{...styles.sectioncontainer, backgroundColor: theme.backgroundColor}}
        heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>Authors</Text>
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
        searchData(content);
      }
      return (
        <TouchableOpacity
          style={{ marginLeft: 15, height: 30, borderRadius: 5, alignItems: 'center', flexDirection: 'row' }}
          onPress={onSubmit}
        >
          <Ionicons style={{ flex: 1 }} name="md-search" size={20} color={theme.textColor} />
          <Text style={{ flex: 11, color: theme.textColor }}>
            {content}
          </Text>
        </TouchableOpacity>
      )
    }

    return (
      <View>
        <View style={styles.header}>
          <Text style={{...styles.title, color: theme.textColor}}>Recent searches</Text>
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
    <View style={{
      ...styles.container,
      backgroundColor: theme.backgroundColor
    }}>
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
