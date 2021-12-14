/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Appbar } from "react-native-paper";

interface Action {
  icon: string;
  onPress: () => void;
}
interface Props {
  navigation?: any;
  title: string;
  subtitle?: string;
  disableBackAction?: boolean;
  actions?: Action[];
}

const Headers: FC<Props> = ({
  navigation,
  title,
  subtitle,
  disableBackAction,
  actions,
}) => {
  return (
    <Appbar.Header>
      {!disableBackAction && (
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      )}
      <Appbar.Content title={title} subtitle={subtitle} />
      {actions &&
        actions.map(({ icon, onPress }) => {
          return <Appbar.Action icon={icon} onPress={onPress} />;
        })}
    </Appbar.Header>
  );
};

export default Headers;
