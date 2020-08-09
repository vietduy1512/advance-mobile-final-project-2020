import React from "react";
import { Text } from "react-native";

const EmptyText = ({ items, body, message }) =>
  items.length !== 0 ? (
    body
  ) : (
    <Text style={{ color: "gray" }}>{message}</Text>
  );

export default EmptyText;
