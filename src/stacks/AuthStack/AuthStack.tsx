import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Login from "../../screens/Login/Login";
import SignUp from "../../screens/SignUp/SignUp";

const AuthStack: FC = () => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            options={{
              headerShown: false,
            }}
            component={Login}
          />
          <Stack.Screen
            name="SignUp"
            options={{
              headerShown: false,
            }}
            component={SignUp}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default AuthStack;
