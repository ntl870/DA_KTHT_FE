import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // width: 300,
    display: "flex",
    flexDirection: "row",
  },
  flexOne: {
    flex: 1,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  button: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  largeText: {
    fontSize: 20,
  },
  mediumText: {
    fontSize: 15,
  },
  userInfos: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    margin: 10,
    borderColor: "#6200ee",
    justifyContent:"space-between",
  },
  userInfosUpperText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ee",
  },
});

export default styles;
