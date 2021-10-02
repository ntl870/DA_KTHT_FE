import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAPI } from "../axios/auth";
import { ILoginForm } from "../../screens/Login/Login";
import { ISubmitSignUpForm } from "../../screens/SignUp/SignUp";

export interface ILoginData {
  success: boolean;
  token: string;
}

export const clientLogin = async (form: ILoginForm): Promise<ILoginData> => {
  try {
    const { data } = await authAPI("").post("/auth/login", form);
    await AsyncStorage.setItem("jwtToken", data.token);
    return data;
  } catch (err) {
    return {
      success: false,
      token: "",
    };
  }
};

export const clientSignUp = async (
  form: ISubmitSignUpForm
): Promise<ILoginData> => {
  try {
    const { data } = await authAPI("").post("/auth/register", form);
    await AsyncStorage.setItem("jwtToken", data.token);
    return data;
  } catch (err) {
    return {
      success: false,
      token: "",
    };
  }
};
