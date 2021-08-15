import AsyncStorage from "@react-native-community/async-storage";
import { User } from "../constants/Interfaces";
import { StorageKeys } from "../constants/StorageKeys";

export const restoreUser = async (): Promise<User | undefined> => {
  try {
    const userState = await AsyncStorage.getItem(StorageKeys.User);
    if (userState) {
      const user: User = JSON.parse(userState);
      return user;
    }
  } catch (error) {
    throw `${error}`;
  }
};
