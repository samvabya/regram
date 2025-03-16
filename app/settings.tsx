import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import CustomHeader from "@/components/customheader";

export default function Settings() {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <CustomHeader title="Settings" />
      </ScrollView>
    </View>
  );
}
