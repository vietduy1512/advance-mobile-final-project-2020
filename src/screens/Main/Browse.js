import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import ImageButton from "components/Common/ImageButton";
import SectionPaths from "components/Paths/SectionPaths/SectionPathsContent";
import SectionAuthors from "components/Authors/SectionAuthors/SectionAuthorsContent";
import PopularSkills from "components/Main/Browse/PopularSkills";
import { Titles } from "constants";
import { ThemeContext } from "config/context";
import { getAllCategories } from "core/services/categoriesService";
import { getAllAuthors } from "core/services/authorsService";
import { LoadingContext } from "config/context";

const Search = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [paths, setPaths] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([getAllCategories(), getAllAuthors()]).then(
      ([categoriesRes, authorsRes]) => {
        setPaths(categoriesRes.data.payload);
        setAuthors(authorsRes.data.payload);
        setLoading(false);
      }
    );
  }, []);

  return (
    <ScrollView
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
      showsVerticalScrollIndicator={false}
    >
      <ImageButton
        title={Titles.NEW_RELEASES}
        image={require("assets/images/mockup/react-js-getting-started-v2.png")}
        onPress={() => {}}
      />
      <ImageButton
        title={Titles.RECOMMENDED}
        image={require("assets/images/mockup/ios-collection-views-getting-started-v1.png")}
        onPress={() => {}}
      />
      <PopularSkills title={Titles.POPULAR_SKILLS} />
      <SectionPaths title={Titles.PATHS} paths={paths} />
      <SectionAuthors title={Titles.TOP_AUTHORS} authors={authors} />
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
  },
});
