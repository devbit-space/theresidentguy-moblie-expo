import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

type LoaderProps = {
  size?: "small" | "large";
  color?: string;
};

const Loader = ({ size = "small", color = "white" }: LoaderProps) => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader; 