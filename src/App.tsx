import "react-native-gesture-handler";
import React, { FC } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import NavigationBar from "./components/NavigationBar/NavigationBar";
const App: FC = () => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <StatusBar />
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
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
        <NavigationBar />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
