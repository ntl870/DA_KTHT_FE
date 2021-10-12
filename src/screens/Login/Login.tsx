import React, { FC, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Button, Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/AuthSlice";
import { clientLogin, ILoginData } from "../../apis/services/auth";
import { RootScreenProps } from "../../types/screens";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";

import styles from "./styles";

export interface ILoginForm {
  email: string;
  password: string;
}

const Login: FC = () => {
  const navigation = useNavigation<RootScreenProps>();

  const dispatch = useDispatch();
  const [isHidden, setHidden] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [wrongInput, setWrongInput] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<ILoginForm>();

  const toggleHidingPassword = (): void => {
    setHidden((prev) => !prev);
  };

  const switchScreen = (): void => {
    navigation.navigate("SignUp");
  };

  const onSubmit = async (form: ILoginForm): Promise<void> => {
    setLoading(true);
    const data: ILoginData = await clientLogin(form);
    const token: string = data.token;
    dispatch(login(token));
    if (!data.success) {
      setLoading(false);
      setWrongInput(true);
      return;
    }
  };

  const formControllerProps: IFormController[] = [
    {
      name: "email",
      control: control,
      error: wrongInput,
      label: "Email",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "email",
      style: styles.input,
    },
    {
      name: "password",
      control: control,
      error: wrongInput,
      label: "Password",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      rightIcon: isHidden ? "eye" : "eye-off",
      secureTextEntry: isHidden,
      onPress: toggleHidingPassword,
      style: styles.input,
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView keyboardVerticalOffset={10}>
        <ScrollView>
          <Image
            source={require("../../assets/icon.png")}
            height={400}
            width={400}
            style={styles.icon}
          />
          {formControllerProps.map((props) => {
            return <FormController {...props} key={props.name} />;
          })}

          {wrongInput && (
            <Text style={styles.errorText}>Wrong Email or Password</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.input}
            icon={isLoading ? "refresh" : undefined}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Login"}
          </Button>
          <View style={styles.switchScreenContainer}>
            <Text style={styles.switchScreenHelperText}>
              Didn't have an account yet ?
            </Text>
            <Pressable
              onPress={switchScreen}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed
                    ? "rgb(210, 230, 255)"
                    : "rgba(0,0,0,0)",
                },
              ]}
            >
              <Text style={styles.switchScreenText}>Sign Up</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
