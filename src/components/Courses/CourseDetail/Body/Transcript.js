import React from "react";
import { StyleSheet } from "react-native";
import { Content, Accordion } from "native-base";

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" },
];

const Transcript = (props) => {
  return (
    <Content
      padder
      style={{
        ...styles.transcriptContainer,
        backgroundColor: props.theme.backgroundColor,
      }}
    >
      <Accordion dataArray={dataArray} />
    </Content>
  );
};

export default Transcript;

const styles = StyleSheet.create({
  transcriptContainer: {},
});
