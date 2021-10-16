import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navigationBarContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexGrow: 0,
    flexDirection: "row",
    backgroundColor: "#6200ee",
  },
  navigationBarTab: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  activeTab: {
    marginTop: -1.5,
  },
  nonActiveText: {
    color: "#9c9b96",
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
    fontWeight: "bold",
  },
  tabIcon: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
});

export default styles;
