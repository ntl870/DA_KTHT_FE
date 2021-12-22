import { useSelector } from "react-redux";
import { selectToken } from "../store/reducers/AuthSlice";

export const useToken = (): { token: string | null } => {
  const token = useSelector(selectToken);
  return { token };
};
