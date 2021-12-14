/* eslint-disable react-native/no-inline-styles */
import React, { FC, Fragment } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/FontAwesome5";
import { GroupScreenProps } from "../../types/screens";
import styles from "./styles";
import { DashboardGroup } from "./GroupList";
import getNameAlias from "../../utils/GetNameAlias";

const GroupItem: FC<DashboardGroup> = ({
  id,
  name,
  numbersOfMember,
  checkedIn,
  role,
  avatars,
  groupImage,
}) => {
  const navigation = useNavigation<GroupScreenProps>();
  return (
    <TouchableOpacity
      activeOpacity={0.3}
      onPress={() =>
        navigation.navigate("GroupDetailScreen", {
          id: id,
          role: role,
        })
      }
    >
      <View style={styles.groupItemContainer}>
        <View>
          <Text style={styles.groupItemLeftNameText}>{name}</Text>
          <View>
            <View
              style={[styles.groupItemLeftMemberContent, { marginTop: 10 }]}
            >
              <Icon name="user-alt" style={styles.groupItemLeftNumberText} />
              <Text style={styles.groupItemLeftNumberText}>
                {`${checkedIn}/${numbersOfMember} members`}
              </Text>
            </View>
            <Progress.Bar
              progress={checkedIn / numbersOfMember}
              width={200}
              height={10}
              color="#6200ee"
            />
            <View style={styles.groupItemLeftImagesGroup}>
              {(() => {
                if (numbersOfMember > 3) {
                  return avatars.map((item, index) => {
                    if (index < 3) {
                      return item.avatar ? (
                        <Avatar.Image
                          size={38}
                          source={{ uri: item?.avatar }}
                          style={styles.groupItemLeftImage}
                          key={index}
                        />
                      ) : (
                        <Avatar.Text
                          size={38}
                          label={getNameAlias(item?.name) as string}
                          style={styles.groupItemLeftImage}
                          key={index}
                        />
                      );
                    }
                    if (index === 3) {
                      return (
                        <Avatar.Text
                          size={38}
                          label={`+${numbersOfMember - 3}`}
                          key={index}
                        />
                      );
                    }
                    return <Fragment key={index} />;
                  });
                }
                return avatars.map((item, index) => {
                  return item.avatar ? (
                    <Avatar.Image
                      size={38}
                      source={{ uri: item?.avatar }}
                      style={styles.groupItemLeftImage}
                      key={index}
                    />
                  ) : (
                    <Avatar.Text
                      size={38}
                      label={getNameAlias(item?.name) as string}
                      style={styles.groupItemLeftImage}
                      key={index}
                    />
                  );
                });
              })()}
            </View>
          </View>
        </View>
        <View style={styles.groupItemRightContent}>
          {groupImage ? (
            <Avatar.Image
              size={80}
              source={{ uri: groupImage }}
              style={{ alignSelf: "flex-end" }}
            />
          ) : (
            <Avatar.Text
              size={80}
              label={getNameAlias(name) as string}
              style={styles.groupItemLeftImage}
            />
          )}

          <Text style={styles.groupItemRightRoleText}>{role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
