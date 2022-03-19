import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

// Generated on https://colors.eva.design/ via Primary: #FF9100, Success: #35d229, Info: #20CAF9, Warning: #FFB626, Danger: #ff5353
import { default as theme } from "./robic-theme.json";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
          <Navigation colorScheme={colorScheme} />
        </ApplicationProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
