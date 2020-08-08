import React from "react";
import { Text } from "react-native";
import { Tab, Tabs, TabHeading } from "native-base";
import Contents from "./Contents";
import Transcript from "./Transcript";

const CourseBody = (props) => {
  return (
    <Tabs tabBarUnderlineStyle={{ backgroundColor: "blue" }}>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: props.theme.backgroundColor }}>
            <Text style={{ color: props.theme.textColor }}>Contents</Text>
          </TabHeading>
        }
      >
        <Contents {...props} />
      </Tab>
      <Tab
        heading={
          <TabHeading style={{ backgroundColor: props.theme.backgroundColor }}>
            <Text style={{ color: props.theme.textColor }}>Transcript</Text>
          </TabHeading>
        }
      >
        <Transcript {...props} />
      </Tab>
    </Tabs>
  );
};

export default CourseBody;
