import React, { FC, useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { ActivityIndicator, Avatar } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import FunctionsFAB from "./FunctionsFAB";
import { useIsFocused } from "@react-navigation/native";
import AddMemberModal from "./AddMemberModal";

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

  const token = useSelector(selectToken);

  const { id } = route.params as { id: string };

  const [isShownAddMemberModal, setIsShownAddMemberModal] = useState(false);
  const [isShownModifyGroupModal, setIsShownModifyGroupModal] = useState(false);
  const isFocused = useIsFocused();
  useEffect(() => {
    dispatch(getGroupDetails({ token: token as string, id: id }));
  }, [dispatch, id, token]);

  const { data, status }: GroupDetailsData = useSelector(selectGroupDetails);
  const groupData = data && (data[0] as Group);
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

  const FABActions: FABAction[] = [
    {
      icon: "plus",
      label: "Add",
      onPress: () => setIsShownAddMemberModal(true),
    },
    {
      icon: "account-group",
      label: "Modify Group",
      onPress: () => setIsShownModifyGroupModal(false),
    },
  ];
  console.log(isShownAddMemberModal);
  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.topContentContainer}>
          <Avatar.Text
            label={String(getNameAlias(String(groupData?.name)))}
            size={150}
          />
          <Text style={styles.titleText}>{groupData?.name}</Text>
          <Text style={styles.membersCountText}>
            {`${groupData?.members.length} Members`}
          </Text>
        </View>

        <TouchableOpacity>
          <QRCode value={groupData?.secretCode} />
        </TouchableOpacity>

        <FunctionsFAB visible={isFocused} actions={FABActions} />

        <View style={styles.membersListContainer}>
          {groupData?.members.map(({ member, _id }, index) => {
            return (
              <View style={styles.memberContainer} key={_id}>
                {member.avatar ? (
                  <Avatar.Image source={{ uri: member.avatar }} size={60} />
                ) : (
                  <Avatar.Text
                    label={getNameAlias(member?.name) as string}
                    size={60}
                  />
                )}

                <View style={styles.memberName}>
                  <Text style={styles.memberNameText}>{member.name}</Text>
                  {(() => {
                    if (index === 0) {
                      return (
                        <Text style={styles.membersEmailText}>
                          nclongkk@gmail.com
                        </Text>
                      );
                    }
                    if (index === 1) {
                      return (
                        <Text style={styles.membersEmailText}>
                          vanbao1210@gmail.com
                        </Text>
                      );
                    }
                    if (index === 2) {
                      return (
                        <Text style={styles.membersEmailText}>
                          ntlong870@gmail.com
                        </Text>
                      );
                    }
                  })()}
                </View>
              </View>
            );
          })}
        </View>
      </View>
      {isShownAddMemberModal && (
        <AddMemberModal
          visible={isShownAddMemberModal}
          onDismiss={() => setIsShownAddMemberModal(false)}
          groupID={id}
        />
      )}
    </ScrollView>
  );
};

export default GroupDetailAdmin;