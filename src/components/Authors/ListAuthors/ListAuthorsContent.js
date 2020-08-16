import React, { useContext } from "react";
import { View, ScrollView } from "react-native";
import ListAuthorsItem from "./ListAuthorsItem";
import { ThemeContext } from "config/context";
import EmptyText from "components/Common/EmptyText";
import { useTranslation } from "react-i18next";

const ListAuthorsContent = (props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const Authors = ({ authors }) =>
    authors.map((item) => <ListAuthorsItem key={item.id} item={item} />);

  return (
    <View style={{ color: theme.textColor }}>
      {props.renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        <EmptyText
          items={props.authors}
          body={<Authors authors={props.authors} />}
          message={t("data.noAuthors")}
        />
      </ScrollView>
    </View>
  );
};

export default ListAuthorsContent;
