import { StackNavigationProp } from "@react-navigation/stack";
export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Login: undefined;
  SignUp: undefined;
};

export type screensProps = StackNavigationProp<RootStackParamList>;
