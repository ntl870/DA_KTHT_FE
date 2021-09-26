import { StackNavigationProp } from "@react-navigation/stack";
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
};

export type MenuScreenProps = StackNavigationProp<MenuStackParamList>;
