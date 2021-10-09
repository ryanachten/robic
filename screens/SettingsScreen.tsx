import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Modal, Text } from "@ui-kitten/components";
import Constants from "expo-constants";
import * as actions from "../actions";
import { Background, Link, Logo, PrivacyPolicy } from "../components";
import { Margin } from "../constants/Sizes";
import { ModalBackground } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../selectors/user.selectors";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);

  const signOut = () => dispatch(actions.requestSignOut.started(undefined));
  const appVersionNumber = Constants.manifest.version;

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
