import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  groupItemContainer: {
    height: 180,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#6200ee",
    marginVertical: 10,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 10,
  },
  groupItemLeftMemberContent: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  groupItemLeftNameText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#6200ee",
    // maxWidth: "90%",
  },
  groupItemLeftNumberText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#9c9b96",
    marginRight: 8,
  },
  groupItemLeftImagesGroup: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
  },
  groupItemLeftImage: {
    marginRight: 5,
  },
  groupItemRightContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  groupItemRightRoleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#6200ee",
    textAlign: "right",
  },
});

export default styles;
