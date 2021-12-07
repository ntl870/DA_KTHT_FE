import axios, { AxiosInstance } from "axios";
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
    baseURL: "https://dut-timetrackingapp.herokuapp.com/api/v1",
    headers: headers,
  });
};
