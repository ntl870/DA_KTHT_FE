/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/**
 * @format
 */
import React from "react";
import { AppRegistry } from "react-native";
import App from "./src/App";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import { Provider } from "react-redux";
import { ModalPortal } from "react-native-modals";
import store from "./src/store";
export const Root = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App />
        <ModalPortal />
      </PaperProvider>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => Root);
