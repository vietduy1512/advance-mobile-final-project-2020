import React, { useContext } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Content } from "constants";
import { ThemeContext } from "config/context";
import SectionCoursesItem from "./SectionCoursesItem";
import EmptyText from "components/Common/EmptyText";
import { NavigationContext } from "@react-navigation/core";
import { Screens } from "constants";
import { useTranslation } from "react-i18next";

const SectionCoursesContent = (props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigation = useContext(NavigationContext);

  const Courses = ({ courses }) =>
    courses.map((item) => <SectionCoursesItem key={item.id} item={item} />);

  return (
    <View>
      <View style={styles.header}>
        <Text style={{ ...styles.title, color: theme.textColor }}>
          {props.title}
        </Text>
        <TouchableOpacity
          style={styles.expandContainer}
          onPress={() => {
            navigation.navigate(Screens.MORE_COURSES, {
              title: props.title,
              fetchCourses: props.fetchCourses,
            });
          }}
        >
          {props.isHideHeader ? null : (
            <Text style={styles.expandText}>{t(Content.SEE_ALL)}</Text>
          )}
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <EmptyText
          items={props.courses}
          body={<Courses courses={props.courses} />}
          message={t("data.noCourses")}
        />
      </ScrollView>
    </View>
  );
};

export default SectionCoursesContent;

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    marginVertical: 10,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  expandContainer: {
    width: 60,
    backgroundColor: "#dcdeef",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  expandText: {
    fontSize: 11,
  },
});
