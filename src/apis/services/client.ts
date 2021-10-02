import { authAPI } from "./../axios/auth";
import { IUser } from "../../types/user";

export const getUserInfo = async (token: string): Promise<IUser | void> => {
  try {
    const { data } = await authAPI(token).get("/auth/me");
    return data;
  } catch (err) {}
};
