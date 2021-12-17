import React, { FC, useEffect, useState, useMemo, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import { AppDispatch } from "../../store";
import { GroupScreenProps, GroupRouteProps } from "../../types/screens";
import {
  getGroupDetails,
  selectGroupDetails,
  GroupDetailsData,
} from "../../store/reducers/GroupDetailsSlice";
import { Status } from "../../types/status";
import styles from "./styles";
import { Group } from "../../types/group";
import getNameAlias from "../../utils/GetNameAlias";
import FunctionsFAB from "./FunctionsFAB";
import { useIsFocused } from "@react-navigation/native";
import AddMemberModal from "./AddMemberModal";
import ModifyGroupModal from "./ModifyGroupModal";
import {
  selectFABStatus,
  enable,
  disable,
} from "../../store/reducers/FABSlice";
import { useNavigation } from "@react-navigation/core";
import { useToken } from "../../hooks/useToken";
import { authAPI } from "../../apis/axios/auth";
import { useSnackbarContext } from "../../hooks/useSnackBarContext";
interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}

export interface FABAction {
  icon: string;
  label: string;
  onPress: () => void;
}

const GroupDetailAdmin: FC<Props> = ({ route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const FABVisible = useSelector(selectFABStatus).isActive;
  const { token } = useToken();
  const { id } = route.params as { id: string };
  const navigation = useNavigation<GroupScreenProps>();
  const [isShownAddMemberModal, setIsShownAddMemberModal] = useState(false);
  const [isShownModifyGroupModal, setIsShownModifyGroupModal] = useState(false);
  const isFocused = useIsFocused() && route.name === "GroupDetailScreen";
  const { setMessage } = useSnackbarContext();

  useEffect(() => {
    dispatch(getGroupDetails({ token: token as string, id: id }));
  }, [dispatch, id, token]);

  useEffect(() => {
    dispatch(enable());
    return () => {
      dispatch(disable());
    };
  }, [dispatch]);

  const { data: groupData, status }: GroupDetailsData =
    useSelector(selectGroupDetails);

  const sendEmail = useCallback(async () => {
    try {
      await authAPI(String(token)).post(`groups/${groupData?._id}/sendEmail`);
      setMessage("Email sent successfully");
    } catch (err) {
      setMessage("Error sending email");
    }
  }, [token, groupData, setMessage]);

  const FABActions: FABAction[] = useMemo(
    () => [
      {
        icon: "plus",
        label: "Add",
        onPress: () => setIsShownAddMemberModal(true),
      },
      {
        icon: "account-group",
        label: "Modify Group",
        onPress: () => setIsShownModifyGroupModal(true),
      },
      {
        icon: "email",
        label: "Send Statistic Email",
        onPress: () => sendEmail(),
      },
    ],
    [setIsShownAddMemberModal, sendEmail]
  );

  const navigateToScheduleScreen = (userId: string, groupId: string) => {
    navigation.navigate("UserScheduleScreen", {
      userId,
      groupId,
    });
  };

  if (status === Status.pending) {
    return <ActivityIndicator size={30} style={styles.loadingIcon} />;
  }

  if (status === Status.rejected) {
    return (
      <View style={styles.error}>
        <Icon name="window-close" size={120} style={styles.errorIcon} />
        <Text style={styles.errorText}>An error has occurred</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.topContentContainer}>
          {groupData?.groupImage ? (
            <Avatar.Image source={{ uri: groupData?.groupImage }} size={150} />
          ) : (
            <Avatar.Text
              label={getNameAlias(String(groupData?.name)) as string}
              size={150}
            />
          )}

          <Text style={styles.titleText}>{groupData?.name}</Text>
          <Text style={styles.membersCountText}>
            {`${groupData?.members.length} Members`}
          </Text>
          <Text style={styles.membersCountText}>{groupData?.description}</Text>
          <Text style={styles.membersCountText}>
            {`Fine per hour: ${groupData?.feePerHour} VND`}
          </Text>
        </View>

        {FABVisible && isFocused && (
          <FunctionsFAB visible={FABVisible} actions={FABActions} />
        )}

        <View style={styles.membersListContainer}>
          {groupData?.members.map(
            ({ member, _id, hasScheduleToday, checkedIn }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={_id}
                  onPress={() =>
                    navigateToScheduleScreen(member._id, groupData?._id)
                  }
                >
                  <View style={styles.memberContainerAdmin}>
                    <View style={styles.memberInfo}>
                      {member?.avatar !== "" ? (
                        <Avatar.Image
                          source={{ uri: member?.avatar }}
                          size={60}
                        />
                      ) : (
                        <Avatar.Text
                          label={getNameAlias(member?.name) as string}
                          size={60}
                        />
                      )}

                      <View style={styles.memberName}>
                        <Text style={styles.memberNameText}>{member.name}</Text>
                        <Text style={styles.membersEmailText}>
                          {member?.email}
                        </Text>
                      </View>
                    </View>

                    {(() => {
                      if (hasScheduleToday) {
                        return (
                          <Icon
                            name="check-circle"
                            size={30}
                            color={checkedIn ? "#77C66E" : "#808080"}
                          />
                        );
                      }
                    })()}
                  </View>
                </TouchableOpacity>
              );
            }
          )}
        </View>
      </View>
      {isShownAddMemberModal && (
        <AddMemberModal
          visible={isShownAddMemberModal}
          onDismiss={() => setIsShownAddMemberModal(false)}
          groupID={id}
        />
      )}

      {isShownModifyGroupModal && (
        <ModifyGroupModal
          groupID={id}
          visible={isShownModifyGroupModal}
          onDismiss={() => setIsShownModifyGroupModal(false)}
          groupData={groupData as Group}
        />
      )}
    </ScrollView>
  );
};

export default GroupDetailAdmin;
