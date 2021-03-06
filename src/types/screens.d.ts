import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Login: undefined;
  SignUp: undefined;
  Menu: undefined;
};

export type RootScreenProps = StackNavigationProp<RootStackParamList>;

export type MenuStackParamList = {
  MenuScreen: undefined;
  EditUserScreen: undefined;
  ChangePasswordScreen: undefined;
  FaceRegconitionScreen: undefined;
};

export type MenuScreenProps = StackNavigationProp<MenuStackParamList>;

export type GroupStackParamList = {
  GroupScreen: undefined;
  GroupDetailScreen: { id: string; role: string } | undefined;
  UserScheduleScreen:
    | { userId: string; groupId: string; name?: string; userName: string }
    | undefined;
};

export type GroupScreenProps = StackNavigationProp<GroupStackParamList>;
export type GroupRouteProps = RouteProp<GroupStackParamList>;
