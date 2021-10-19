import "react-native-gesture-handler";
import React, { FC, useCallback, useEffect } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { selectToken } from "./store/reducers/AuthSlice";
import { getToken } from "./store/reducers/AuthSlice";
import AuthStack from "./stacks/AuthStack/AuthStack";
import GroupStack from "./stacks/GroupStack/GroupStack";
import MenuStack from "./stacks/MenuStack/MenuStack";
import { getClientAsync } from "./store/reducers/UserSlice";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NavigationBar from "./components/NavigationBar/NavigationBar";

const App: FC = () => {
  const dispatch = useDispatch();
  dispatch(getToken());
  const token = useSelector(selectToken);
  const isSignedIn = Boolean(token);

  const fetchUser = useCallback((): void => {
    if (isSignedIn) {
      dispatch(getClientAsync(token as string));
    }
  }, [dispatch, token, isSignedIn]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser, token]);

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
      <StatusBar />
      {isSignedIn ? (
        <NavigationContainer>
          <Tab.Navigator
            tabBar={(props) => <NavigationBar {...props} />}
            screenOptions={{ headerShown: false }}
          >
            <Tab.Screen name="Home" component={GroupStack} />
            <Tab.Screen
              name="Menu"
              component={MenuStack}
              options={{ headerShown: false }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <AuthStack />
      )}
    </SafeAreaProvider>
  );
};

export default App;
