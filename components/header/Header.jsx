import { View, Text, StyleSheet } from "react-native";
import React from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import AVT from "./Avatar";

const styles = StyleSheet.create({
  avt: {
    borderCurve: "continuous",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 25,
    fontWeight: 600,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.avt}>
        <AVT />
      </View>
      <View>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View className="items-center">
        <View
          className="absolute top-0 right-0 rounded-full w-2 h-2 bg-red-600 mt-0 mr-0 z-10"
        />
        <Ionicons name="notifications-outline" size={30} color="black" />
      </View>
    </View>
  );
}