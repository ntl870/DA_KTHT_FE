import React, { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GroupStackParamList } from "../../types/screens";
import Headers from "../../components/Header/Header";
import GroupList from "../../screens/GroupDashBoard/GroupList";
import GroupDetail from "../../screens/GroupDetail/GroupDetail";
import UserSchedule from "../../screens/GroupDashBoard/UserSchedule";

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
        <Stack.Screen
          name="GroupDetailScreen"
          component={GroupDetail}
          options={({ navigation }) => ({
            header: () => (
              <Headers navigation={navigation} title="Group Details" />
            ),
          })}
        />
        <Stack.Screen
          name="UserScheduleScreen"
          component={UserSchedule}
          options={({ navigation }) => ({
            header: () => (
              <Headers navigation={navigation} title="User Schedule" />
            ),
          })}
        />
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default GroupStack;
