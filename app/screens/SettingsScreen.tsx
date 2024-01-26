import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import { Background, Link, Logo, PrivacyPolicy } from "../components";
import { Margin } from "../constants/Sizes";
import { AuthContext, UserContext } from "../services/context";
import Constants from "expo-constants";
import { ModalBackground } from "../constants/Colors";

export default function SettingsScreen() {
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    actions: { signOut },
  } = useContext(AuthContext);

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const appVersionNumber = Constants.expoConfig?.version;

  return (
    <Background>
      <Modal
        visible={showPrivacyPolicy}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setShowPrivacyPolicy(false)}
      >
        <PrivacyPolicy />
      </Modal>
      <Logo style={styles.logo} />
      <Text category="h5" style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>
      <Text category="s1" style={styles.spacing}>
        {user.email}
      </Text>
      <Button appearance="outline" onPress={signOut} style={styles.spacing}>
        Log out
      </Button>
      <Card style={styles.spacing}>
        <Text category="label">Robic version</Text>
        <Text style={styles.spacing}>{appVersionNumber}</Text>
        <Text category="label">Credits</Text>
        <Text>Designed and developed by</Text>
        <Link url="http://ryanachten.io/">Ryan Achten</Link>
      </Card>
      <Button
        appearance="outline"
        status="basic"
        onPress={() => setShowPrivacyPolicy(true)}
        style={styles.spacing}
      >
        Privacy policy
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    marginBottom: Margin.md,
  },
  name: {
    marginBottom: Margin.sm,
  },
  spacing: {
    marginBottom: Margin.md,
  },
  backdrop: {
    backgroundColor: ModalBackground,
  },
});
