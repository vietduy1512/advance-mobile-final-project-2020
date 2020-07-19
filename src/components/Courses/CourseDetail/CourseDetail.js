import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import Constants from "expo-constants";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationRouteContext } from '@react-navigation/core';
import { NavigationContext } from '@react-navigation/core';
import { Tab, Tabs, TabHeading, Content, Accordion } from 'native-base';
import {bookmark, unbookmark} from 'actions/bookmarkAction';
import {connect} from 'react-redux';
import {ThemeContext} from 'context';
import {getCourseDetail, likeCourses, getCourseLikeStatus} from 'core/services/coursesService';
import {getAuthorDetail} from 'core/services/authorsService';
import moment from 'moment';

const CourseDetail = () => {
  const {theme} = useContext(ThemeContext);

  const filledStarImage = require('assets/images/star_filled.png');
  const emptyStarImage = require('assets/images/star_corner.png');

  const [course, setCourse] = useState({});
  const [author, setAuthor] = useState({});
  const route = useContext(NavigationRouteContext);
  const navigation = useContext(NavigationContext);
  const { courseId } = route.params;

  useEffect(() => {
    getCourseDetail(courseId).then(response => {
      setCourse(response.data.payload);
      getAuthorDetail(response.data.payload.instructorId).then(response => {
        setAuthor(response.data.payload);
      })
    });
  }, [])

  const renderStars = () => {
    let stars = [];
    for (let index = 0; index < course.ratedNumber; index++) {
      stars.push(<Image source={filledStarImage} key={index} style={styles.ratingStar} />);
    }
    for (let index = course.ratedNumber; index < 5; index++) {
      stars.push(<Image source={emptyStarImage} key={index} style={styles.ratingStar} />);
    }
    return stars;
  };

  const VideoViewer = () => {
    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity style={{width: 40, height: 40, top: 5, left: 5, position: 'absolute', zIndex: 1}} onPress={() => {
          navigation.goBack();
        }}>
          <MaterialCommunityIcons name="close" size={26} color="white" />
        </TouchableOpacity>
        <Image source={{uri: course.imageUrl}} style={styles.video} />
        <Text style={{...styles.courseTitle, color: theme.textColor}}>{course.title}</Text>
      </View>
    )
  };

  const AuthorButton = () => {
    return (
      <TouchableOpacity style={styles.expandContainer}>
        <View style={styles.authorContainer} >
          <Image source={{uri: author.avatar}} style={styles.author} />
        </View>
        <Text>{author.name}</Text>
      </TouchableOpacity>
    )
  };

  const CourseInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.darkText}>{`${moment(course.updatedAt).format("MM/DD/YYYY")} - ${course.totalHours} hours`}</Text>
        <View style={styles.ratingStarContainer}>
          {renderStars()}
        </View>
      </View>
    )
  };


  const AccessibilityButtons = (props) => {
    
    const BookmarkButton = () => {
      const bookmarkCourse = () => {
        likeCourses(courseId).then(res => {
          setIsBookmarked(res.data.likeStatus);
        });
      }
      const unbookmarkCourse = () => {
        likeCourses(courseId).then(res => {
          setIsBookmarked(res.data.likeStatus);
        });
      }
      const [isBookmarked, setIsBookmarked] = useState(false);

      useEffect(() => {
        getCourseLikeStatus(courseId).then(res => {
          setIsBookmarked(res.data.likeStatus);
        });
      }, [props.bookmarkIds])

      return isBookmarked ? (
        <TouchableOpacity style={styles.accessibilityButton} onPress={unbookmarkCourse}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/bookmark.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 12, color: theme.textColor}}>Unbookmark</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.accessibilityButton} onPress={bookmarkCourse}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/bookmark.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 12, color: theme.textColor}}>Bookmark</Text>
          </View>
        </TouchableOpacity>
      );
    }
    const ChannelAdd = () => {
      return (
        <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/channel-add.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10, width: 100, alignItems: 'center'}}>
            <Text style={{fontSize: 12, color: theme.textColor}}>Add to channel</Text>
          </View>
        </TouchableOpacity>
      )
    }
    const DownloadButton = () => {
      return (
        <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/download.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 12, color: theme.textColor}}>Download</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <View style={styles.accessibilityContainer}>
        <BookmarkButton />
        <ChannelAdd />
        <DownloadButton />
      </View>
    )
  };

  const AccessibilityButtonsWraper = connect(
    mapStateToProps,
    {bookmark, unbookmark},
  )(AccessibilityButtons);

  // TODO: Add expand button
  const Summary = () => {
    return (
      <View style={styles.summaryContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={{fontSize: 16, color: 'gray'}}>
            {course.description}
          </Text>
        </ScrollView>
      </View>
    )
  }

  const Relevants = () => {
    return (
      <View style={styles.relevantsContainer}>
        <TouchableOpacity style={styles.relevantsButton} onPress={() => {}}>
          <Entypo name="archive" size={20} />
          <Text style={{fontSize: 12, marginLeft: 5}}>Related paths & courses</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.relevantsButton} onPress={() => {}}>
          <MaterialCommunityIcons name="checkbox-multiple-marked-circle-outline" size={20} />
          <Text style={{fontSize: 12, marginLeft: 5}}>Take a learning check</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ContentHeader = ({section, index}) => {
    return (
      <View style={{flex: 1, height: 60, flexDirection: 'row', marginBottom: 10, marginTop: 20}}>
        <View style={{flex: 1, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center'}}>
          <Text>{index}</Text>
        </View>
        <View style={{flex: 3, marginLeft: 15, justifyContent: 'center'}}>
          <Text style={{fontSize: 16, color: theme.textColor}}>{section.name}</Text>
          {/* TODO */}
          {/* <Text style={{marginTop: 10, fontSize: 10, color: 'gray'}}>{section.duration}</Text> */}
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => {}}>
            <MaterialCommunityIcons name="information" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => {}}>
            <MaterialCommunityIcons name="dots-horizontal" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const ContentBodyItem = ({name, isWatched}) => {
    return (
      <View style={{marginTop: 15, borderBottomWidth: 0.5, borderBottomColor: 'gray', flexDirection: 'row'}}>
        {isWatched ? (
          <View style={{
            height: 15,
            width: 15,
            marginRight: 20,
          }}
          >
            <Image source={require('assets/images/check.png')} style={{
              flex: 1,
              borderRadius: 30,
              height: undefined,
              width: undefined
            }}
            />
          </View>
        ): (
          <View style={{
            height: 15,
            width: 15,
            marginRight: 20,
          }}/>
        )}
        <Text style={{marginBottom: 15, color: theme.textColor}}>{name}</Text>
      </View>
    );
  }

  const ContentBody = ({section}) => {
    return (
      <>
        {section.lesson.map((item, key) => <ContentBodyItem key={key} name={item.name} isWatched={true}/>)}
      </>
    )
  }

  const Contents = () => {
    return (
      <View style={{...styles.contentsContainer, backgroundColor: theme.backgroundColor}}>
        {course.section && course.section.map((section, index) => (
          <View style={{width: '100%'}} key={index}>
            <ContentHeader section={section} index={index+1}/>
            <ContentBody section={section}/>
          </View>
        ))}
      </View>
    )
  }

  const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];

  const Transcript = () => {
    return (
      <Content padder style={{...styles.transcriptContainer, backgroundColor: theme.backgroundColor}}>
        <Accordion dataArray={dataArray}/>
      </Content>
    )
  }
  
  const CourseBody = () => {
    return (
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'blue'}} >
        <Tab heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>Contents</Text>
          </TabHeading>
        }>
          <Contents />
        </Tab>
        <Tab heading={
          <TabHeading style={{backgroundColor: theme.backgroundColor}}>
            <Text style={{color: theme.textColor}}>Transcript</Text>
          </TabHeading>
        }>
          <Transcript />
        </Tab>
      </Tabs>
    )
  }

  return (
    <ScrollView style={{
      ...styles.container,
      backgroundColor: theme.backgroundColor
    }} showsVerticalScrollIndicator={false}>
      <VideoViewer />
      <AuthorButton />
      <CourseInfo />
      <AccessibilityButtonsWraper />
      <Summary />
      <Relevants />
      <CourseBody />
    </ScrollView>
  );
}

const mapStateToProps = state => ({
  bookmarkIds: state.bookmark.bookmarkIds,
});

export default CourseDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  videoContainer: {
    height: 250,
    width: undefined
  },
  video: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 15
  },
  expandContainer: {
    height: 30,
    width: 120,
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 15
  },
  authorContainer: {
    height: 30,
    width: 30,
    marginRight: 5
  },
  author: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined
  },
  infoContainer: {
    flexDirection: 'row',
    marginHorizontal: 15
  },
  darkText: {
    color: 'gray',
    fontSize: 16
  },
  ratingStarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20
  },
  ratingStar: {
    height: 15,
    width: 15,
    marginRight: 2
  },
  accessibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginTop: 20,
  },
  accessibilityButton: {
    marginHorizontal: 15,
    alignItems: 'center'
  },
  accessibilityImageContainer: {
    backgroundColor: 'lightgrey',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
  },
  accessibilityImageSize: {
    height: 30,
    width: 30,
  },
  accessibilityImage: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  summaryContainer: {
    height: 70,
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
    marginVertical: 10,
    paddingTop: 10,
  },
  relevantsButton: {
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 5,
    height: 35,
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center'
  },
  relevantsContainer: {
    marginBottom: 30
  },
  contentsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 15
  },
  transcriptContainer: {
  }
});
