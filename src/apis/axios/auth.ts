import axios from "axios";
import { BASE_API } from "@env";

export const clientAPI = axios.create({
  baseURL: BASE_API,
});
