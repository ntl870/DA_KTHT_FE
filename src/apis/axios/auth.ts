import axios, { AxiosInstance } from "axios";
import { BASE_API } from "@env";
interface IHeaders {
  "Access-Control-Allow-Origin": "*";
  Accept: string;
  "Content-Type": string;
  Authorization: string;
}

export const authAPI = (token: string): AxiosInstance => {
  const headers: IHeaders = {
    "Access-Control-Allow-Origin": "*",
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return axios.create({
    baseURL: BASE_API,
    headers: headers,
  });
};
