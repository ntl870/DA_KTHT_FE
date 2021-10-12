/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { logout } from "../../store/reducers/AuthSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

interface IProps {
  style?: any;
}

const LogoutButton: FC<IProps> = ({ style }) => {
  const dispatch = useDispatch();
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      dispatch(logout());
    } catch (err) {}
  };
  return (
    <Button mode="contained" onPress={logOut} style={style} color="#FF4433">
      Logout
    </Button>
  );
};

export default LogoutButton;
