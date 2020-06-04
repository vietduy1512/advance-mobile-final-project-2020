import React, {useContext} from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import Constants from "expo-constants";
import {MockupDataContext} from 'context';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { NavigationRouteContext } from '@react-navigation/core';
import { Tab, Tabs, TabHeading } from 'native-base';

const CourseDetail = () => {
  const filledStarImage = require('assets/images/star_filled.png');
  const emptyStarImage = require('assets/images/star_corner.png');

  const {courses, authors} = useContext(MockupDataContext);
  const route = useContext(NavigationRouteContext);
  const { courseId } = route.params;
  let course = courses.find(course => course.id === courseId);
  let author = authors.find(author => author.id === course.authorId);

  const renderStars = () => {
    let stars = [];

    for (let index = 0; index < course.rating; index++) {
      stars.push(<Image source={filledStarImage} key={index} style={styles.ratingStar} />);
    }
    for (let index = course.rating; index < 5; index++) {
      stars.push(<Image source={emptyStarImage} key={index} style={styles.ratingStar} />);
    }
    return stars;
  };

  const VideoViewer = () => {
    return (
      <View style={styles.videoContainer}>
        <Image source={course.image} style={styles.video} />
        <Text style={styles.courseTitle}>{course.title}</Text>
      </View>
    )
  };

  const AuthorButton = () => {
    return (
      <TouchableOpacity style={styles.expandContainer}>
        <View style={styles.authorContainer} >
          <Image source={author.image} style={styles.author} />
        </View>
        <Text>{author.name}</Text>
      </TouchableOpacity>
    )
  };

  const CourseInfo = () => {
    return (
      <View style={styles.infoContainer}>
        <Text style={styles.darkText}>{`${course.level} - ${course.released} - ${course.duration}`}</Text>
        <View style={styles.ratingStarContainer}>
          {renderStars()}
          <Text style={styles.reviewText}>{`(${course.reviews})`}</Text>
        </View>
      </View>
    )
  };

  const AccessibilityButtons = () => {
    return (
      <View style={styles.accessibilityContainer}>
        <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/bookmark.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 12}}>Bookmark</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/channel-add.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10, width: 100, alignItems: 'center'}}>
            <Text style={{fontSize: 12}}>Add to channel</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accessibilityButton} onPress={() => {}}>
          <View style={styles.accessibilityImageContainer}>
            <View style={styles.accessibilityImageSize}>
              <Image source={require('assets/images/download.png')} style={styles.accessibilityImage} />
            </View>
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 12}}>Download</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };

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
          <Text style={{fontSize: 16}}>{section.title}</Text>
          <Text style={{marginTop: 10, fontSize: 10, color: 'gray'}}>{section.duration}</Text>
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

  const ContentBodyItem = ({title, isWatched}) => {
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
        <Text style={{marginBottom: 15}}>{title}</Text>
      </View>
    );
  }

  const ContentBody = ({section}) => {
    return (
      <>
        {section.data.map((item, key) => <ContentBodyItem key={key} title={item.title} isWatched={true}/>)}
      </>
    )
  }

  const Contents = () => {
    return (
      <View style={styles.contentsContainer}>
        {course.content.map((section, index) => (
          <View style={{width: '100%'}} key={index}>
            <ContentHeader section={section} index={index+1}/>
            <ContentBody section={section}/>
          </View>
        ))}
      </View>
    )
  }

  const Transcript = () => {
    return (
      <View style={styles.transcriptContainer}>
        <Text>Transcript</Text>
      </View>
    )
  }
  
  const CourseBody = () => {
    return (
      <Tabs tabBarUnderlineStyle={{backgroundColor: 'blue'}} >
        <Tab heading={
          <TabHeading style={{backgroundColor: 'white'}}>
            <Text>Contents</Text>
          </TabHeading>
        }>
          <Contents />
        </Tab>
        <Tab heading={
          <TabHeading style={{backgroundColor: 'white'}}>
            <Text>Transcript</Text>
          </TabHeading>
        }>
          <Transcript />
        </Tab>
      </Tabs>
    )
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VideoViewer />
      <AuthorButton />
      <CourseInfo />
      <AccessibilityButtons />
      <Summary />
      <Relevants />
      <CourseBody />
    </ScrollView>
  );
}



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
  reviewText: {
    color: 'darkgray',
    fontSize: 12,
    marginLeft: 3
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
    margin: 15
  }
});
