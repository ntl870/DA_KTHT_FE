import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navigationBarContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexGrow: 0,
    flexDirection: "row",
  },
  navigationBarTab: {
    flexGrow: 1,
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  activeTab: {
    borderTopWidth: 1,
    borderColor: "#4267B2",
    marginTop: -1.5,
  },
  nonActiveText: {
    color: "#696969",
  },
  activeText: {
    color: "#4267B2",
  },
  tabIcon: {
    alignItems: "center",
  },
});

export default styles;
