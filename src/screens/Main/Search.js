import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  AsyncStorage,
} from "react-native";
import Constants from "expo-constants";
import SearchListCourses from "components/Main/Search/SearchListCourses";
import SearchListPaths from "components/Main/Search/SearchListPaths";
import SearchListAuthors from "components/Main/Search/SearchListAuthors";
import { Titles } from "constants";
import { Tab, Tabs, TabHeading, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "config/context";
import { getAllCategories } from "core/services/categoriesService";
import { getAllAuthors } from "core/services/authorsService";
import { searchCourse } from "core/services/coursesService";
import { LoadingContext } from "config/context";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { setLoading } = useContext(LoadingContext);
  const { theme } = useContext(ThemeContext);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchCourses, setSearchCourses] = useState([]);
  const [searchPaths, setSearchPaths] = useState([]);
  const [searchAuthors, setSearchAuthors] = useState([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchRecentSearches();
  }, []);

  const fetchRecentSearches = async () => {
    const result = await AsyncStorage.getItem("recent_searches");
    if (!result) {
      return;
    }
    const searches = JSON.parse(result);
    setRecentSearches(searches);
  };

  const searchData = (text) => {
    setLoading(true);
    saveSearchHistory(text);
    Promise.all([searchCourse(text), getAllCategories(), getAllAuthors()])
      .then(([coursesRes, categoriesRes, authorsRes]) => {
        let courses = coursesRes.data.payload.rows;
        let newPaths = categoriesRes.data.payload.filter((path) =>
          path.name.toLowerCase().includes(text.toLowerCase())
        );
        let newAuthors = authorsRes.data.payload.filter((author) =>
          author["user.name"].toLowerCase().includes(text.toLowerCase())
        );

        setSearchCourses(courses);
        setSearchPaths(newPaths);
        setSearchAuthors(newAuthors);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveSearchHistory = async (text) => {
    let searches = [];
    const result = await AsyncStorage.getItem("recent_searches");
    if (result) {
      searches = JSON.parse(result);
    }
    if (searches && searches.length > 10) {
      searches.pop();
    }
    searches.unshift(text);
    setRecentSearches(searches);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(searches));
  };

  const deleteSearchHistory = async (index) => {
    let searches = [...recentSearches];
    searches.splice(index, 1);
    setRecentSearches(searches);
    await AsyncStorage.setItem("recent_searches", JSON.stringify(searches));
  };

  const AllSection = () => {
    const { t } = useTranslation();
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.sectioncontainer}
      >
        <SearchListCourses title={t(Titles.COURSES)} courses={searchCourses} />
        <SearchListPaths title={t(Titles.PATHS)} paths={searchPaths} />
        <SearchListAuthors title={t(Titles.AUTHORS)} authors={searchAuthors} />
      </ScrollView>
    );
  };

  const Header = () => {
    const [searchText, setSearchText] = useState("");

    const onSubmitEditing = () => {
      searchData(searchText);
      setShowResult(true);
      setSearchText("");
    };

    return (
      <View
        style={{
          height: 40,
          backgroundColor: "white",
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            flex: 4,
            margin: 5,
            borderRadius: 5,
            backgroundColor: "lightgray",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Ionicons
            style={{ flex: 1, marginLeft: 5 }}
            name="md-search"
            size={20}
            color="black"
          />
          <TextInput
            style={{ flex: 8 }}
            onChangeText={(text) => setSearchText(text)}
            onSubmitEditing={onSubmitEditing}
            value={searchText}
          />
          <TouchableOpacity
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Ionicons
              name="md-close-circle"
              size={20}
              color="gray"
              onPress={() => setSearchText("")}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          onPress={() => {
            Keyboard.dismiss();
            setSearchCourses([]);
            setSearchPaths([]);
            setSearchAuthors([]);
            setSearchText("");
            setShowResult(false);
          }}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const SearchContent = () => {
    const { t } = useTranslation();
    return (
      <Tabs tabBarUnderlineStyle={{ backgroundColor: "blue" }}>
        <Tab
          style={{
            ...styles.sectioncontainer,
            backgroundColor: theme.backgroundColor,
          }}
          heading={
            <TabHeading style={{ backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: theme.textColor }}>All</Text>
            </TabHeading>
          }
        >
          <AllSection />
        </Tab>
        <Tab
          style={{
            ...styles.sectioncontainer,
            backgroundColor: theme.backgroundColor,
          }}
          heading={
            <TabHeading style={{ backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: theme.textColor }}>Courses</Text>
            </TabHeading>
          }
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListCourses
              title={t(Titles.COURSES)}
              courses={searchCourses}
              isRenderSection={true}
            />
          </ScrollView>
        </Tab>
        <Tab
          style={{
            ...styles.sectioncontainer,
            backgroundColor: theme.backgroundColor,
          }}
          heading={
            <TabHeading style={{ backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: theme.textColor }}>Paths</Text>
            </TabHeading>
          }
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListPaths
              title={t(Titles.PATHS)}
              paths={searchPaths}
              isRenderSection={true}
            />
          </ScrollView>
        </Tab>
        <Tab
          style={{
            ...styles.sectioncontainer,
            backgroundColor: theme.backgroundColor,
          }}
          heading={
            <TabHeading style={{ backgroundColor: theme.backgroundColor }}>
              <Text style={{ color: theme.textColor }}>Authors</Text>
            </TabHeading>
          }
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.sectioncontainer}
          >
            <SearchListAuthors
              title={t(Titles.AUTHORS)}
              authors={searchAuthors}
              isRenderSection={true}
            />
          </ScrollView>
        </Tab>
      </Tabs>
    );
  };

  const RecentSearches = () => {
    const { t } = useTranslation();
    
    const Searches = ({ content, index }) => {
      const onSubmit = () => {
        setSearchCourses([]);
        setSearchPaths([]);
        setSearchAuthors([]);
        searchData(content);
        setShowResult(true);
      };
      const onDelete = () => {
        deleteSearchHistory(index);
      };
      return (
        <View
          style={{
            marginHorizontal: 20,
            height: 30,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <TouchableOpacity
            style={{
              height: 30,
              flexDirection: "row",
              width: "90%",
            }}
            onPress={onSubmit}
          >
            <Ionicons name="md-search" size={24} color={theme.textColor} />
            <Text
              style={{ fontSize: 20, marginLeft: 20, color: theme.textColor }}
            >
              {content}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name="ios-close-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      );
    };

    return (
      <View>
        <View style={styles.header}>
          <Text style={{ ...styles.title, color: theme.textColor }}>
            {t("searches.recentSearches")}
          </Text>
          <TouchableOpacity style={styles.clearBtnContainer}>
            <Text style={styles.clearBtn}>Remove all</Text>
          </TouchableOpacity>
        </View>
        {recentSearches.map((content, index) => (
          <Searches key={index} content={content} index={index} />
        ))}
      </View>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.backgroundColor,
      }}
    >
      <Header />
      {showResult ? <SearchContent /> : <RecentSearches />}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  sectioncontainer: {
    marginHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 15,
  },
  clearBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  clearBtn: {
    color: "blue",
    fontSize: 11,
  },
});
