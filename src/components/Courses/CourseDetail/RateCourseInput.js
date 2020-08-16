import React, { useState, useContext } from "react";
import { Text, Button, View, StyleSheet, Picker } from "react-native";
import { LoadingContext } from "config/context";
import InputField from "components/Common/InputField";
import validator from "validator";
import { ratingCourse } from "core/services/coursesService";
import { useTranslation } from "react-i18next";

const Login = ({ course }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [dirty, setDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading } = useContext(LoadingContext);
  const { t } = useTranslation();

  const handleChange = (value) => {
    setComment(value);
    setDirty(true);
  };

  const submit = () => {
    if (!comment) {
      setErrorMessage(t("validation.pleaseFillInput"));
      return;
    }
    setErrorMessage("");

    setLoading(true);
    ratingCourse(course.id, comment, rating)
      .then(() => {
        setComment("");
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      })
      .finally(() => {
        setLoading(false);
        setDirty(false);
      });
  };

  const isValidComment = () => {
    return validator.isLength(comment, { min: 4 });
  };

  return (
    <View style={styles.container}>
      <InputField
        title={t("courseDetail.comment")}
        error={t("validation.invalidComment")}
        dirty={dirty}
        validation={isValidComment}
        value={comment}
        onChangeText={(value) => handleChange(value)}
      />
      <Picker
        selectedValue={rating}
        style={{ marginHorizontal: 30, width: undefined }}
        onValueChange={(value) => setRating(value)}
      >
        <Picker.Item label="1 star" value={1} />
        <Picker.Item label="2 stars" value={2} />
        <Picker.Item label="3 stars" value={3} />
        <Picker.Item label="4 stars" value={4} />
        <Picker.Item label="5 stars" value={5} />
      </Picker>
      <View style={styles.submit}>
        <Button title={t("authentication.submit")} onPress={submit} />
      </View>
      <Text
        style={{
          marginTop: 20,
          marginHorizontal: 40,
          color: "red",
          fontSize: 16,
          alignSelf: "center",
        }}
      >
        {errorMessage}
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
  },
  submit: {
    width: 100,
    alignSelf: "center",
  },
});
