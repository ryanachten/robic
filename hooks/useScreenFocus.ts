import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

// Refresh plant feed on init load and subsequent focuses
export function useScreenFocus(func: () => void) {
  const nav = useNavigation();
  useEffect(() => {
    func();
    const unsubscribe = nav.addListener("focus", () => {
      func();
    });
    return unsubscribe;
  }, [nav]);
}
