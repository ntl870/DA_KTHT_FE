import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MenuScreen from "../../screens/Menu/Menu";
import EditUserScreen from "../../screens/EditUser/EditUser";
import ChangePasswordScreen from "../../screens/ChangePassword/ChangePassword";
import Headers from "../../components/Header/Header";

const MenuStack: FC = () => {
  const Stack = createStackNavigator();
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="MenuScreen">
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditUserScreen"
          component={EditUserScreen}
          options={({ navigation }) => ({
            header: () => <Headers navigation={navigation} title="Edit User" />,
          })}
        />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordScreen}
          options={({ navigation }) => ({
            header: () => (
              <Headers navigation={navigation} title="Change Password" />
            ),
          })}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default MenuStack;
