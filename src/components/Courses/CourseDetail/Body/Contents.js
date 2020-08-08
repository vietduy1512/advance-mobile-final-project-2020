import React from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const ContentBodyItem = ({ name, isWatched, theme }) => {
  return (
    <View
      style={{
        marginTop: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: "gray",
        flexDirection: "row",
      }}
    >
      {isWatched ? (
        <View
          style={{
            height: 15,
            width: 15,
            marginRight: 20,
          }}
        >
          <Image
            source={require("assets/images/check.png")}
            style={{
              flex: 1,
              borderRadius: 30,
              height: undefined,
              width: undefined,
            }}
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
      <Text style={{ marginBottom: 15, color: theme.textColor }}>{name}</Text>
    </View>
  );
};

const ContentBody = ({ section, theme }) => {
  return (
    <>
      {section.lesson.map((item, key) => (
        <ContentBodyItem
          key={key}
          name={item.name}
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
});
