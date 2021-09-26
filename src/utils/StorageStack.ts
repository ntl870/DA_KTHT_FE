import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuStackParamList } from "../types/screens";

export const setStorageStack = async (
  key: string,
  screen: keyof MenuStackParamList
): Promise<void> => {
  await AsyncStorage.setItem(key, screen);
};
