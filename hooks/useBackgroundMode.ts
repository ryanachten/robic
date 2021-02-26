import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

interface useBackgroundModeCallbacks {
  onForeground?: () => void;
  onBackground?: () => void;
}

const useBackgroundMode = ({
  onBackground,
  onForeground,
}: useBackgroundModeCallbacks) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    const currentState = appState.current;

    if (nextAppState === "active") {
      onForeground && onForeground();
    }

    if (
      currentState.match("active") &&
      (nextAppState === "inactive" || nextAppState === "background")
    ) {
      onBackground && onBackground();
    }
  };
};

export default useBackgroundMode;
