import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import { ThemeContext } from "config/context";
import ListPathsItem from "./ListPathsItem";
import EmptyText from "components/Common/EmptyText";

const ListPathsContent = (props) => {
  const { theme } = useContext(ThemeContext);

  const Paths = ({ paths }) =>
    paths.map((item) => <ListPathsItem key={item.id} item={item} />);

  return (
    <View style={{ flex: 1, color: theme.textColor }}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmptyText
          items={props.paths}
          body={<Paths paths={props.paths} />}
          message="There are no paths yet!"
        />
      </ScrollView>
    </View>
  );
};

export default ListPathsContent;
