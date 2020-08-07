import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { ThemeContext } from "config/context";
import ListPathsItem from "./ListPathsItem";

const ListPathsContent = (props) => {
  const { theme } = useContext(ThemeContext);

  const Paths = ({ paths }) =>
    paths.map((item) => <ListPathsItem key={item.id} item={item} />);

  return (
    <View style={{ flex: 1, color: theme.textColor }}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Paths paths={props.paths} />
      </ScrollView>
    </View>
  );
};

export default ListPathsContent;
