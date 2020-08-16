import React, { useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Content } from "constants";
import { ThemeContext } from "config/context";
import SectionPathsItem from "./SectionPathsItem";
import EmptyText from "components/Common/EmptyText";
import { useTranslation } from "react-i18next";

const SectionPathsContent = (props) => {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const Paths = ({ paths }) =>
    paths.map((item) => <SectionPathsItem key={item.id} item={item} />);

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
          items={props.paths}
          body={<Paths paths={props.paths} />}
          message={t("data.noPaths")}
        />
      </ScrollView>
    </View>
  );
};

export default SectionPathsContent;

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
