import "react-native-gesture-handler";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "./store/reducers/AuthSlice";
import Home from "./screens/Home/Home";
import Camera from "./components/Camera/Camera";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { getToken } from "./store/reducers/AuthSlice";
import AuthStack from "./stacks/AuthStack/AuthStack";

const App: FC = () => {
  const dispatch = useDispatch();
  const Stack = createStackNavigator();
  dispatch(getToken());
  const token = useSelector(selectToken);
  const isSignedIn = Boolean(token);
  return (
    <SafeAreaProvider>
      <StatusBar />
      {isSignedIn ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              options={{
                headerShown: false,
              }}
              component={Home}
            />
            <Stack.Screen
              name="Camera"
              component={Camera}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
          <NavigationBar />
        </NavigationContainer>
      ) : (
        <AuthStack />
      )}
    </SafeAreaProvider>
  );
};

export default App;
