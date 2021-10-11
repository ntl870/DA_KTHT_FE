import React, { FC } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import { MenuStackParamList, MenuScreenProps } from "../../types/screens";
import { selectUserInfo } from "../../store/reducers/UserSlice";
import getNameAlias from "../../utils/GetNameAlias";
import styles from "./styles";
import Schedule from "../../components/Schedule/Schedule";

const MenuScreen: FC = () => {
  const navigation: MenuScreenProps = useNavigation<MenuScreenProps>();
  const navigateToTab = (screen: keyof MenuStackParamList): void => {
    navigation.push(screen);
  };

  const { data } = useSelector(selectUserInfo);
  const nameAlias: string | void = getNameAlias(data?.name as string);

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity
        style={styles.userInfosContainer}
        activeOpacity={0.4}
        onPress={() => navigateToTab("EditUserScreen")}
      >
        <View style={styles.userInfos}>
          {data?.avatar ? (
            <Avatar.Image
              size={60}
              source={{ uri: data?.avatar }}
              style={styles.userInfosImage}
            />
          ) : (
            <Avatar.Text
              size={60}
              label={nameAlias as string}
              style={styles.userInfosImage}
            />
          )}

          <View>
            <Text style={styles.userInfosUpperText}>{data?.name}</Text>
            <Text>See your profile</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View />
      <Schedule />
    </SafeAreaView>
  );
};

export default MenuScreen;
