import React, { useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext } from "config/context";
import ListCoursesContent from "components/Courses/ListCourses/ListCoursesContent";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContext } from "@react-navigation/core";

const PagingListCourses = (props) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useContext(NavigationContext);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          justifyContent: "center",
          zIndex: 1,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <MaterialCommunityIcons name="close" size={26} color="black" />
      </TouchableOpacity>
      <Text style={{ ...styles.title, color: theme.textColor }}>
        {props.title}
      </Text>
    </View>
  );

  return (
    <>
      <ListCoursesContent
        {...props}
        title={props.title}
        renderHeader={renderHeader}
      />
      <View style={styles.paging}>
        <TouchableOpacity
          style={styles.btnContainer}
          disabled={props.isLeftDisabled}
          onPress={props.onLeftPress}
        >
          <AntDesign
            style={{ opacity: props.isLeftDisabled ? 0.3 : 1 }}
            name="caretleft"
            size={30}
            color="black"
          />
        </TouchableOpacity>
        <Text style={{fontSize: 24}}>{props.page}</Text>
        <TouchableOpacity
          style={styles.btnContainer}
          disabled={props.isRightDisabled}
          onPress={props.onRightPress}
        >
          <AntDesign
            style={{ opacity: props.isRightDisabled ? 0.3 : 1 }}
            name="caretright"
            size={30}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PagingListCourses;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 20,
  },
  paging: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    bottom: 70,
  },
  btnContainer: {
    marginHorizontal: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
