import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

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

const ContentBodyItem = ({
  item,
  isWatched,
  theme,
  currentId,
  setCurrentId,
  setCurrentLessonUrl,
}) => {
  const isSelected = currentId === item.id;

  return (
    <TouchableOpacity
      style={{
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        flexDirection: "row",
      }}
      onPress={() => {
        setCurrentId(item.id);
        setCurrentLessonUrl(item.videoUrl);
      }}
    >
      {isSelected ? (
        <View style={styles.iconContainer}>
          <AntDesign name="playcircleo" size={20} color="blue" />
        </View>
      ) : isWatched ? (
        <View style={styles.iconContainer}>
          <Image
            source={require("assets/images/check.png")}
            style={styles.icon}
          />
        </View>
      ) : (
        <View
          style={{
            height: 15,
            width: 15,
            marginRight: 20,
          }}
        />
      )}
      <Text style={{ marginBottom: 15, color: theme.textColor }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const ContentBody = ({
  section,
  theme,
  currentId,
  setCurrentId,
  setCurrentLessonUrl,
}) => {
  return (
    <>
      {section.lesson.map((item, key) => (
        <ContentBodyItem
          key={key}
          item={item}
          isWatched={true}
          theme={theme}
          currentId={currentId}
          setCurrentId={setCurrentId}
          setCurrentLessonUrl={setCurrentLessonUrl}
        />
      ))}
    </>
  );
};

const Contents = ({
  course,
  theme,
  currentSelectedId,
  setCurrentLessonUrl,
}) => {
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    setCurrentId(currentSelectedId);
  }, [currentSelectedId]);

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
            <ContentBody
              section={section}
              theme={theme}
              currentId={currentId}
              setCurrentId={setCurrentId}
              setCurrentLessonUrl={setCurrentLessonUrl}
            />
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
  icon: {
    flex: 1,
    borderRadius: 30,
    height: undefined,
    width: undefined,
  },
});
