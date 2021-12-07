import React, { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { FABAction } from "./GroupDetailAdmin";

interface Props {
  visible: boolean;
  actions: FABAction[];
}

const styles = StyleSheet.create({
  fabGroup: {
    paddingBottom: 50,
  },
});

const FunctionsFAB: FC<Props> = ({ visible, actions }) => {
  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;
  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={open ? "calendar-today" : "plus"}
        style={styles.fabGroup}
        onStateChange={onStateChange}
        visible={visible}
        actions={actions}
      />
    </Portal>
  );
};

export default FunctionsFAB;
