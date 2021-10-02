import React, { FC } from "react";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar, Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/core";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { MenuStackParamList, MenuScreenProps } from "../../types/screens";
import { selectUserInfo } from "../../store/reducers/UserSlice";
import getNameAlias from "../../utils/GetNameAlias";
import styles from "./styles";

const MenuScreen: FC = () => {
  const navigation: MenuScreenProps = useNavigation<MenuScreenProps>();
  const navigateToTab = (screen: keyof MenuStackParamList): void => {
    navigation.push(screen);
  };

  const { data } = useSelector(selectUserInfo);
  const nameAlias: string = getNameAlias(data?.name as string);

  return (
    <SafeAreaView style={styles.root}>
      <View>
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
                label={nameAlias}
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
        <View>
          <Button mode="contained" style={styles.button}>
            Your Schedule
          </Button>
        </View>
      </View>
      <LogoutButton style={styles.button} />
    </SafeAreaView>
  );
};

export default MenuScreen;
