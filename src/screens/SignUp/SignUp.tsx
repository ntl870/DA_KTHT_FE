import React, { FC, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { RootScreenProps } from "../../types/screens";
import { login } from "../../store/reducers/AuthSlice";
import { clientSignUp, ILoginData } from "../../apis/services/auth";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";
import validateEmail from "../../utils/ValidateEmail";
import styles from "./styles";

interface ISignUpForm {
  name: string;
  email: string;
  password: string;
  reEnterPassword: string;
}

export interface ISubmitSignUpForm {
  name: string;
  email: string;
  password: string;
}

interface IHidePassWord {
  password: boolean;
  reEnterPassword: boolean;
  [key: string]: boolean;
}

interface InputError {
  type: string;
  error: string;
}

const SignUp: FC = () => {
  const navigation = useNavigation<RootScreenProps>();
  const dispatch = useDispatch();
  const [isHiddenPassword, setHiddenPassword] = useState<IHidePassWord>({
    password: true,
    reEnterPassword: true,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const [inputErrorsIndex, setInputErrorsIndex] = useState<number | null>(null);

  const inputErrors: InputError[] = [
    {
      type: "email",
      error: "Invalid email form",
    },
    {
      type: "password",
      error: "The passwords don't match",
    },
    {
      type: "existed",
      error: "The user is already existed",
    },
    {
      type: "name",
      error: "Please fill in your name",
    },
  ];

  const { handleSubmit, control } = useForm<ISignUpForm>();

  const toggleHidingPassword = (key: string): void => {
    const clone = { ...isHiddenPassword };
    clone[key] = !clone[key];
    setHiddenPassword(clone);
  };

  const switchScreen = (): void => {
    navigation.navigate("Login");
  };

  const onSubmit = async (form: ISignUpForm): Promise<void> => {
    setLoading(true);
    if (!validateEmail(form.email)) {
      setLoading(false);
      setInputErrorsIndex(0);
      return;
    }
    if (form.password !== form.reEnterPassword) {
      setLoading(false);
      setInputErrorsIndex(1);
      return;
    }
    if (!form.name) {
      setLoading(false);
      setInputErrorsIndex(3);
      return;
    }
    const submittingForm: ISubmitSignUpForm = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
    };
    const data: ILoginData = await clientSignUp(submittingForm);
    const token: string = data.token;
    if (!data.success) {
      setLoading(false);
      setInputErrorsIndex(2);
      return;
    }
    dispatch(login(token));
  };

  const formControllersProps: IFormController[] = [
    {
      name: "name",
      control: control,
      error: inputErrorsIndex === 3,
      label: "Your full name",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "account",
      style: styles.input,
    },
    {
      name: "email",
      control: control,
      error: inputErrorsIndex === 0,
      label: "Email",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "email",
      style: styles.input,
    },
    {
      name: "password",
      control: control,
      error: inputErrorsIndex === 1,

      label: "Password",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      rightIcon: isHiddenPassword.password ? "eye" : "eye-off",
      secureTextEntry: isHiddenPassword.password,
      style: styles.input,
      onPress: () => toggleHidingPassword("password"),
    },
    {
      name: "reEnterPassword",
      control: control,
      error: inputErrorsIndex === 1,
      label: "Re-enter your password",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      rightIcon: isHiddenPassword.reEnterPassword ? "eye" : "eye-off",
      secureTextEntry: isHiddenPassword.reEnterPassword,
      style: styles.input,
      onPress: () => toggleHidingPassword("reEnterPassword"),
    },
  ];

  return (
    <SafeAreaProvider style={styles.root}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
      >
        <ScrollView>
          {formControllersProps.map((props) => {
            return <FormController {...props} key={props.name} />;
          })}
          {inputErrorsIndex !== null && (
            <Text style={styles.errorText}>
              {inputErrors[inputErrorsIndex].error}
            </Text>
          )}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            style={styles.input}
            icon={isLoading ? "refresh" : undefined}
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Sign Up"}
          </Button>
          <View style={styles.switchScreenContainer}>
            <Text style={styles.switchScreenHelperText}>
              Already had an account ?
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
              <Text style={styles.switchScreenText}>Login</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  );
};

export default SignUp;
