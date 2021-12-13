import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, IconButton, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { getGroupDetails } from "../../store/reducers/GroupDetailsSlice";
import { Group } from "../../types/group";
import { selectToken } from "../../store/reducers/AuthSlice";
import getNameAlias from "../../utils/GetNameAlias";
import Modal, { ModalContent, ModalTitle } from "react-native-modals";
import { authAPI } from "../../apis/axios/auth";

interface Props {
  id: string;
  groupData: Group;
}

const styles = StyleSheet.create({
  memberContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#6200ee",
    padding: 10,
    borderRadius: 10,
  },
  memberInfo: {
    display: "flex",
    flexDirection: "row",
  },
  nameText: {
    fontSize: 15,
    fontWeight: "400",
    color: "#6200ee",
  },
  avatar: {
    marginRight: 10,
  },
  modalButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20,
  },
  membersEmailText: {
    color: "rgba(55, 65, 81, 0.7)",
    fontSize: 13,
  },
});

const MemberList: FC<Props> = ({ groupData }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const token = useSelector(selectToken);
  const dispatch: AppDispatch = useDispatch();

  const deleteMember = (memberId: string) => async () => {
    try {
      await authAPI(String(token)).delete(
        `/groups/${groupData._id}/member/${memberId}`
      );
    } catch (err) {
    } finally {
      dispatch(getGroupDetails({ token: String(token), id: groupData._id }));
      setIsModalVisible(false);
    }
  };

  return (
    <View>
      {groupData?.members?.map(({ member }) => (
        <View key={member._id} style={styles.memberContainer}>
          <View style={styles.memberInfo}>
            {member.avatar ? (
              <Avatar.Image
                source={{ uri: member.avatar }}
                size={40}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Text
                label={getNameAlias(member?.name) as string}
                size={40}
                style={styles.avatar}
              />
            )}
            <View>
              <Text style={styles.nameText}>{member.name}</Text>
              <Text style={styles.membersEmailText}>{member?.email}</Text>
            </View>
          </View>
          <View>
            <IconButton
              icon="close-circle"
              color="red"
              size={20}
              onPress={() => {
                setIsModalVisible(true);
                setDeleteID(member._id);
              }}
            />
          </View>
        </View>
      ))}
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          modalTitle={
            <ModalTitle title="Confirm Dialog" textStyle={{ color: "red" }} />
          }
        >
          <ModalContent>
            <Text style={{ fontSize: 17, marginTop: 10 }}>
              Are you sure you want to delete this member?
            </Text>
            <View style={styles.modalButtons}>
              <Button mode="contained" onPress={deleteMember(deleteID)}>
                Yes
              </Button>
              <Button
                mode="contained"
                color="red"
                onPress={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>
            </View>
          </ModalContent>
        </Modal>
      )}
    </View>
  );
};

export default MemberList;
