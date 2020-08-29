import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// React Native secure storage does not support web, so we fallback to local storage in on this platform
export const setItem = async (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    window.localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return window.localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

export const deleteItem = async (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    return window.localStorage.removeItem(key);
  } else {
    return await SecureStore.deleteItemAsync(key);
  }
};
