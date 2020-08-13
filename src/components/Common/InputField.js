import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Item, Icon, Label, Input } from "native-base";

const InputField = ({
  title,
  dirty,
  validation,
  value,
  onChangeText,
  error,
  secureTextEntry,
}) => (
  <View style={styles.section}>
    <Item
      floatingLabel
      last
      error={dirty && !validation()}
      success={validation()}
    >
      <Label>{title}</Label>
      <Input
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
      {!dirty ? null : validation() ? (
        <Icon name="checkmark-circle" />
      ) : (
        <Icon name="close-circle" />
      )}
    </Item>
    {!dirty ? null : validation() ? null : (
      <Text style={{ color: "red" }}>{error}</Text>
    )}
  </View>
);

export default InputField;

const styles = StyleSheet.create({
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
});
