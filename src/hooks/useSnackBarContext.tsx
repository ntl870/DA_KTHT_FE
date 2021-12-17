/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext, useState, createContext } from "react";
import { StyleSheet } from "react-native";
import { Snackbar, Text } from "react-native-paper";

interface Snackbar {
  visible: boolean;
  message: string;
  setVisible?: (visible: boolean) => void;
  setMessage?: (message: string) => void;
}

const SnackbarContext = createContext({
  visible: false,
  message: "",
  setMessage: (message: string) => {},
});

export const useSnackbarContext = () => {
  return useContext(SnackbarContext);
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: "#6200ee",
  },
  snackbarText: {
    color: "#fafafa",
    fontSize: 15,
  },
});

export const SnackbarProvider = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const snackBarData = {
    setMessage: (message: string) => {
      setVisible(true);
      setMessage(message);
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    },
    visible,
    message,
    setVisible,
  };

  return (
    <SnackbarContext.Provider value={snackBarData}>
      {props.children}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>{message}</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
