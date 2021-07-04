import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

// Execute given function on screen focus
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
