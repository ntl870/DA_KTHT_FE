import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GroupStackParamList } from "../../types/screens";
import GroupList from "../../screens/GroupDashBoard/GroupList";
import GroupDetail from "../../screens/GroupDetail/GroupDetail";

const GroupStack: FC = () => {
  const Stack = createStackNavigator<GroupStackParamList>();
  return (
    <SafeAreaProvider>
      <Stack.Navigator initialRouteName="GroupScreen">
        <Stack.Screen
          name="GroupScreen"
          component={GroupList}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="GroupDetailScreen" component={GroupDetail} />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default GroupStack;
