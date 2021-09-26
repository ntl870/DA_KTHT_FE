import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, HelperText } from "react-native-paper";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { MenuScreenProps } from "../../types/screens";
import FormController, {
  IFormController,
} from "../../components/FormController/FormController";
import { AppDispatch } from "../../store";
import {
  updateClientAsync,
  selectUserInfo,
} from "../../store/reducers/UserSlice";
import { selectToken } from "../../store/reducers/AuthSlice";
import styles from "./styles";
import { Status } from "../../types/status";

export interface ILoginForm {
  password: string;
  repassword: string;
}

const Login: FC = () => {
  const navigation = useNavigation<MenuScreenProps>();
  const dispatch = useDispatch<AppDispatch>();
  const [isHidden, setHidden] = useState({
    password: true,
    repassword: true,
  });
  const { status } = useSelector(selectUserInfo);
  const isLoading = status === Status.pending;
  const [wrongInput, setWrongInput] = useState({
    password: false,
    repassword: false,
  });
  const [isNotMatched, setNotMatched] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<ILoginForm>();

  const toggleHiding = (
    id: number,
    setState: React.Dispatch<
      React.SetStateAction<{
        password: boolean;
        repassword: boolean;
      }>
    >
  ): void => {
    id === 0
      ? setState((prev) => {
          const clone = { ...prev };
          clone.password = !clone.password;
          return clone;
        })
      : setState((prev) => {
          const clone = { ...prev };
          clone.repassword = !clone.repassword;
          return clone;
        });
  };
  const token: string = useSelector(selectToken) as string;

  const onSubmit = async (form: ILoginForm): Promise<void> => {
    const { password, repassword } = form;
    if (password.length < 6) {
      setWrongInput((prev) => {
        const clone = { ...prev };
        clone.password = true;
        return clone;
      });
      return;
    }
    setWrongInput((prev) => {
      const clone = { ...prev };
      clone.password = false;
      return clone;
    });

    if (repassword.length < 6) {
      setWrongInput((prev) => {
        const clone = { ...prev };
        clone.repassword = true;
        return clone;
      });
      return;
    }
    setWrongInput((prev) => {
      const clone = { ...prev };
      clone.repassword = false;
      return clone;
    });

    if (password !== repassword) {
      setNotMatched(true);
      return;
    }
    setNotMatched(false);

    try {
      dispatch(
        updateClientAsync({
          token: token,
          form: {
            password: form.password,
          },
        })
      );
    } catch (err) {
    } finally {
      navigation.navigate("MenuScreen");
    }
  };

  const formControllerProps: IFormController[] = [
    {
      name: "password",
      control: control,
      error: wrongInput.password || isNotMatched,
      label: "Enter your new password",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      rightIcon: isHidden ? "eye" : "eye-off",
      secureTextEntry: isHidden.password,
      onPress: () => toggleHiding(0, setHidden),
      style: styles.input,
    },
    {
      name: "repassword",
      control: control,
      error: wrongInput.repassword || isNotMatched,
      label: "Re-enter your new password",
      mode: "outlined",
      outlineColor: "#5D3FD3",
      leftIcon: "lock",
      rightIcon: isHidden ? "eye" : "eye-off",
      secureTextEntry: isHidden.repassword,
      onPress: () => toggleHiding(1, setHidden),
      style: styles.input,
    },
  ];

  return (
    <SafeAreaView style={styles.root}>
      {formControllerProps.map((props) => {
        return <FormController {...props} key={props.name} />;
      })}
      <HelperText
        type="error"
        visible={wrongInput.password || wrongInput.repassword || isNotMatched}
        style={styles.errorText}
      >
        {isNotMatched
          ? "Passwords are not match"
          : "Password has to be at least 6 characters long"}
      </HelperText>
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
    </SafeAreaView>
  );
};

export default Login;
