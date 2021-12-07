import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Text } from "react-native-paper";

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

interface Props {
  active: boolean;
}

const LoadingOverlay: FC<Props> = ({ active }) => {
  if (!active) {
    return null;
  }
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
      <Text>Processing...</Text>
    </View>
  );
};

export default LoadingOverlay;
