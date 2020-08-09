import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { ThemeContext } from "config/context";
import ListCoursesItem from "./ListCoursesItem";
import EmptyText from "components/Common/EmptyText";

const ListCoursesContent = (props) => {
  const { theme } = useContext(ThemeContext);

  const Courses = ({ courses }) =>
    courses.map((item) => <ListCoursesItem key={item.id} item={item} />);

  return (
    <View style={{ color: theme.textColor }}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmptyText
          items={props.courses}
          body={<Courses courses={props.courses}/>}
          message="There are no courses yet!"
        />
      </ScrollView>
    </View>
  );
};

export default ListCoursesContent;
