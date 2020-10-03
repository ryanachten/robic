import { Toast } from "native-base";
import React from "react";
import { View } from "react-native";

export const ErrorToast = ({ error }: { error: Error | string | null }) => {
  // Handle both Error objects and string messages
  const message = error instanceof Error ? error.message : error;
  message &&
    Toast.show({
      buttonText: "Okay",
      duration: 5000,
      text: message,
      type: "danger",
    });

  return <View></View>;
};
