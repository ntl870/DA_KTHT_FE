import { clientAPI } from "../axios/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILoginForm } from "../../screens/Login/Login";
import { headers } from "../axios/headers";
export interface ILoginData {
  success: boolean;
  token: string;
}

export const clientLogin = async (form: ILoginForm): Promise<ILoginData> => {
  try {
    const { data } = await clientAPI.post("auth/login", form, {
      headers: headers,
    });
    await AsyncStorage.setItem("jwtToken", data.token);
    return data;
  } catch (err) {
    return {
      success: false,
      token: "",
    };
  }
};
