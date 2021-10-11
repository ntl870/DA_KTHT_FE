import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 10,
  },
  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  icon: {
    alignSelf: "center",
    marginLeft: 40,
  },
  errorText: {
    fontSize: 15,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
  switchScreenContainer: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  switchScreenHelperText: {
    fontWeight: "bold",
  },
  switchScreenText: {
    color: "#5D3FD3",
    fontWeight: "bold",
  },
});

export default styles;
