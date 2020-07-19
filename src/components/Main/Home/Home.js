import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import SectionCourses from '../../Courses/SectionCourses/SectionCoursesContent';
import SectionPaths from '../../Courses/SectionPaths/SectionPathsContent';
import Channels from './Channels/Channels';
import { Titles } from 'constants';
import {connect} from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {Screens} from 'constants';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Settings from '../Settings/Settings';
import {ThemeContext} from 'context';
import {getTopSellCourses} from 'core/services/coursesService';
import {getAllCategories} from 'core/services/categoriesService';
import {getFavoriteCourses} from 'core/services/coursesService';
import {LoadingContext} from 'context';

const HomeStack = createStackNavigator();

const Home = () => {
  const {setLoading} = useContext(LoadingContext);
  const {theme} = useContext(ThemeContext);
  const [courses, setCourses] = useState([]);
  const [paths, setPaths] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getTopSellCourses(), getAllCategories(), getFavoriteCourses()])
      .then(([coursesRes, categoriesRes, favoriteRes]) => {
        setCourses(coursesRes.data.payload);
        setPaths(categoriesRes.data.payload);

        const data = favoriteRes.data.payload;
        const model = data.map(item => ({
          id: item.id,
          ratedNumber: item.courseContentPoint,
          imageUrl: item.courseImage,
          title: item.courseTitle,
          'instructor.user.name': item.instructorName,
        }));
        // TODO: Use Redux instead
        setBookmarks(model);
        setLoading(false);
      });
  }, [])

  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor
      }}
      showsVerticalScrollIndicator={false}
    >
      <SectionCourses title={Titles.CONTINUE_LEARNING} courses={courses} />
      <SectionPaths title={Titles.PATHS} paths={paths} />
      <Channels />
      <SectionCourses title={Titles.BOOKMARKS} courses={bookmarks} />
    </ScrollView>
  );
}

const HomeScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator mode="modal">
      <HomeStack.Screen
        name={Screens.HOME}
        component={HomeWrapper}
        options={{
          headerTitle: <Text>{Screens.HOME}</Text>,
          headerLeftContainerStyle: {marginLeft: 10},
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screens.SETTINGS)}>
              <AntDesign name="setting" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {marginRight: 10},
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate(Screens.LOGIN)}>
              <FontAwesome name="power-off" size={24} color="black" />
            </TouchableOpacity>
          )
        }}
      />
      <HomeStack.Screen name={Screens.SETTINGS} component={Settings} />
    </HomeStack.Navigator>
  )
}

const mapStateToProps = state => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

const HomeWrapper = connect(
  mapStateToProps,
  null,
)(Home);

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10
  },
});
