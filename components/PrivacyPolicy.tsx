import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@ui-kitten/components";
import { Margin } from "../constants/Sizes";
import { Link } from "./Link";

// Generated via https://www.privacy.org.nz/tools/privacy-statement-generator/
export const PrivacyPolicy = () => {
  return (
    <Card style={styles.card} disabled={true}>
      <View style={styles.spacing}>
        <Text category="h6" style={styles.title}>
          Robic Privacy Policy
        </Text>
        <Text>
          We collect personal information from you, including information about
          your:
        </Text>
        <Bullet>name</Bullet>
        <Bullet>contact information</Bullet>
        <Bullet>exercise data</Bullet>
      </View>
      <View style={styles.spacing}>
        <Text>We collect your personal information in order to:</Text>
        <Bullet>
          provide analytics relating to an individual's exercise habits
        </Bullet>
      </View>
      <Text style={styles.spacingSmall}>
        You have the right to ask for a copy of any personal information we hold
        about you, and to ask for it to be corrected if you think it is wrong.
        If you’d like to ask for a copy of your information, or to have it
        corrected, please contact us at:{" "}
      </Text>
      <Link url="https://github.com/ryanachten/Robic/issues">Robic GitHub</Link>
    </Card>
  );
};

const Bullet = ({ children }: { children: string }) => (
  <View style={styles.bulletWrapper}>
    <Text style={styles.bullet}>•</Text>
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  bullet: {
    marginRight: Margin.xs,
  },
  bulletWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  card: {
    margin: Margin.md,
  },
  spacing: {
    marginBottom: Margin.md,
  },
  spacingSmall: {
    marginBottom: Margin.sm,
  },
  title: {
    marginBottom: Margin.md,
    textAlign: "center",
  },
});
