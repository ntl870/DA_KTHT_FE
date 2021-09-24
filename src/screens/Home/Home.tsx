import React, { FC } from "react";
import { logout } from "../../store/reducers/AuthSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/screens";
import { Button } from "react-native-paper";
import { Text } from "react-native";

type screensProps = StackNavigationProp<RootStackParamList>;

const Home: FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<screensProps>();
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      dispatch(logout());
      // navigation.navigate("Login");
    } catch (err) {}
  };
  return (
    <Button mode="contained" onPress={logOut}>
      Logout
    </Button>
  );
};

export default Home;
