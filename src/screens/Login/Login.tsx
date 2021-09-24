import React, { FC, useState } from "react";
import { SafeAreaView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/reducers/AuthSlice";
import { clientLogin, ILoginData } from "../../apis/services/client";
import styles from "./styles";

export interface ILoginForm {
  email: string;
  password: string;
}

const Login: FC = () => {
  const dispatch = useDispatch();
  const [isHidden, setHidden] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [wrongInput, setWrongInput] = useState<boolean>(false);
  const { handleSubmit, control } = useForm<ILoginForm>();
  const toggleHidingPassword = (): void => {
    setHidden((prev) => !prev);
  };
  const onSubmit = async (form: ILoginForm): Promise<void> => {
    setLoading(true);
    const data: ILoginData | undefined = await clientLogin(form);
    const token: string = data.token;
    dispatch(login(token));
    if (!data.success) {
      setLoading(false);
      setWrongInput(!data.success);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            error={wrongInput}
            label="Email"
            mode="outlined"
            outlineColor="#5D3FD3"
            left={<TextInput.Icon name="email" />}
            style={styles.input}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <TextInput
            error={wrongInput}
            label="Password"
            secureTextEntry={isHidden}
            mode="outlined"
            outlineColor="#5D3FD3"
            left={<TextInput.Icon name="lock" />}
            right={
              <TextInput.Icon
                name={isHidden ? "eye" : "eye-off"}
                onPress={toggleHidingPassword}
              />
            }
            style={styles.input}
            onChangeText={(text) => onChange(text)}
            value={value}
          />
        )}
      />
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
    </SafeAreaView>
  );
};

export default Login;
