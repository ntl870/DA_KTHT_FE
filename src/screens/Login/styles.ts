import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  input: {
    marginRight: 30,
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 15,
    textAlign: "center",
    color: "red",
    fontWeight: "bold",
  },
});

export default styles;
