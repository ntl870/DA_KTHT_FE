import React, { FC, useEffect, useState } from "react";
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
import { selectToken } from "../../store/reducers/AuthSlice";
import { Status } from "../../types/status";
import styles from "./styles";
import { Group } from "../../types/group";
import getNameAlias from "../../utils/GetNameAlias";
import AddMemberModal from "./AddMemberModal";
import ModifyGroupModal from "./ModifyGroupModal";

import { useNavigation } from "@react-navigation/core";
import { selectUserInfo } from "../../store/reducers/UserSlice";

interface Props {
  route: GroupRouteProps;
  navigation: GroupScreenProps;
}

export interface FABAction {
  icon: string;
  label: string;
  onPress: () => void;
}

const GroupDetailUser: FC<Props> = ({ route }) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector(selectToken);
  const userID = useSelector(selectUserInfo).data?._id;
  const { id } = route.params as { id: string };
  const navigation = useNavigation<GroupScreenProps>();

  const [isShownAddMemberModal, setIsShownAddMemberModal] = useState(false);
  const [isShownModifyGroupModal, setIsShownModifyGroupModal] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetails({ token: token as string, id: id }));
  }, [dispatch, id, token]);

  const { data: groupData, status }: GroupDetailsData =
    useSelector(selectGroupDetails);

  const navigateToScheduleScreen = () => {
    navigation.navigate("UserScheduleScreen", {
      userId: "",
      groupId: "",
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

        <View style={styles.membersListContainer}>
          {groupData?.members.map(
            ({ member, _id, hasScheduleToday, checkedIn }) => {
              if (userID === member?._id) {
                return (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    key={_id}
                    onPress={navigateToScheduleScreen}
                  >
                    <View
                      style={{
                        ...styles.memberContainerUser,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
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
                          <Text style={styles.memberNameText}>
                            {member.name}
                          </Text>
                          <Text style={styles.membersEmailText}>
                            {member?.email}
                          </Text>
                        </View>
                      </View>
                      <View>
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
                        <Text style={styles.memberNameText}>You</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }
              return (
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

export default GroupDetailUser;
