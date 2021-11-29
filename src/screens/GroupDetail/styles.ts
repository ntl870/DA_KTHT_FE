import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loadingIcon: {
    flex: 1,
  },
  error: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  errorIcon: {
    color: "rgba(55, 65, 81, 0.3)",
  },
  errorText: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(55, 65, 81, 0.3)",
  },
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  topContentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6200ee",
    marginTop: 10,
  },
  membersCountText: {
    color: "rgba(55, 65, 81, 0.7)",
    fontSize: 20,
  },
  membersListContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 10,
  },
  memberContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#6200ee",
    padding: 10,
    borderRadius: 10,
  },
  memberName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  memberNameText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6200ee",
  },
  membersEmailText: {
    color: "rgba(55, 65, 81, 0.7)",
    fontSize: 15,
  },
});

export default styles;
