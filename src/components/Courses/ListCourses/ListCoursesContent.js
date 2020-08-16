import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { ThemeContext } from "config/context";
import ListCoursesItem from "./ListCoursesItem";
import EmptyText from "components/Common/EmptyText";
import { useTranslation } from "react-i18next";

const ListCoursesContent = (props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const Courses = ({ courses }) =>
    courses.map((item) => <ListCoursesItem key={item.id} item={item} />);

  return (
    <View style={{ color: theme.textColor }}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmptyText
          items={props.courses}
          body={<Courses courses={props.courses} />}
          message={t("data.noCourses")}
        />
      </ScrollView>
    </View>
  );
};

export default ListCoursesContent;
