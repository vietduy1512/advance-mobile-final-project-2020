import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import SectionAuthorsItem from "./SectionAuthorsItem";
import { Content } from "constants";
import { ThemeContext } from "config/context";
import EmptyText from "components/Common/EmptyText";
import { useTranslation } from "react-i18next";

const SectionAuthorsContent = (props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const Authors = ({ authors }) =>
    authors.map((item) => <SectionAuthorsItem key={item.id} item={item} />);

  return (
    <View>
      <View style={styles.header}>
        <Text style={{ ...styles.title, color: theme.textColor }}>
          {props.title}
        </Text>
        <TouchableOpacity style={styles.expandContainer}>
          <Text style={styles.expandText}>{t(Content.SEE_ALL)}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <EmptyText
          items={props.authors}
          body={<Authors authors={props.authors} />}
          message={t("data.noAuthors")}
        />
      </ScrollView>
    </View>
  );
};

export default SectionAuthorsContent;

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
