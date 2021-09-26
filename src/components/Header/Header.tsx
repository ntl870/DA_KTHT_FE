/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface Props {
  navigation: any;
  title: string;
  subtitle?: string;
}

const Headers: FC<Props> = ({ navigation, title, subtitle }) => {
  return (
    <Appbar.Header>
      <Appbar.BackAction onPress={() => navigation.goBack()} />
      <Appbar.Content title={title} subtitle={subtitle} />
    </Appbar.Header>
  );
};

export default Headers;
