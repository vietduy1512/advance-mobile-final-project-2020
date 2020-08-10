import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import {
  getLessonExercise,
  getExerciseQuestion,
} from "core/services/coursesService";

const ContentHeader = ({ section, index, theme }) => {
  return (
    <View
      style={{
        flex: 1,
        height: 60,
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "lightgray",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{index}</Text>
      </View>
      <View style={{ flex: 3, marginLeft: 15, justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: theme.textColor }}>
          {section.name}
        </Text>
        {/* TODO */}
        {/* <Text style={{marginTop: 10, fontSize: 10, color: 'gray'}}>{section.duration}</Text> */}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="information" size={16} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {}}
        >
          <MaterialCommunityIcons name="dots-horizontal" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ContentBodyItem = ({ lesson, theme }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getLessonExercise(lesson.id).then((response) => {
      const exercisesIds = response.data.payload.exercises.map((x) => x.id);
      exercisesIds.map((exerciseId) =>
        getExerciseQuestion(exerciseId).then((response) => {
          const resultExercises = response.data.payload.exercises;
          console.log(resultExercises);
          setExercises([
            ...exercises,
            ...resultExercises.exercises_questions.map((x) => x.content),
          ]);
        })
      );
    });
  }, []);

  return (
    <>
      <Text style={{ marginTop: 15, fontSize: 16 }}>{lesson.name}</Text>
      {exercises.map((content, index) => (
        <TouchableOpacity
          style={{
            marginTop: 15,
            borderBottomWidth: 0.5,
            borderBottomColor: "gray",
            flexDirection: "row",
          }}
          key={index}
          onPress={() => {}}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="questioncircleo" size={20} color="red" />
          </View>
          <Text style={{ marginBottom: 15, color: theme.textColor }}>
            {content}
          </Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const ContentBody = ({ section, theme }) => {
  return (
    <>
      {section.lesson.map((lesson, key) => (
        <ContentBodyItem
          key={key}
          lesson={lesson}
          isWatched={true}
          theme={theme}
        />
      ))}
    </>
  );
};

const Contents = ({ course, theme }) => {
  return (
    <View
      style={{
        ...styles.contentsContainer,
        backgroundColor: theme.backgroundColor,
      }}
    >
      {course.section &&
        course.section.map((section, index) => (
          <View style={{ width: "100%" }} key={index}>
            <ContentHeader section={section} index={index + 1} theme={theme} />
            <ContentBody section={section} theme={theme} />
          </View>
        ))}
    </View>
  );
};

export default Contents;

const styles = StyleSheet.create({
  contentsContainer: {
    flex: 1,
    alignItems: "flex-start",
    padding: 15,
  },
  iconContainer: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
});
