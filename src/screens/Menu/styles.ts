import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  flexOne: {
    flex: 1,
  },
  divider: {
    backgroundColor: "#5D3FD3",
    height: 0.6,
  },
  userInfosContainer: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5D3FD3",
    margin: 10,
    marginBottom: 20,
  },
  userInfos: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  userInfosImage: {
    margin: 10,
  },
  userInfosUpperText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    margin: 10,
  },
});

export default styles;
