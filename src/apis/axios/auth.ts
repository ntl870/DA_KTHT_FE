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
    baseURL: "http://192.168.1.100:5000/api/v1",
    headers: headers,
  });
};
