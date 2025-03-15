import { View, Text, StatusBar, ScrollView, Image } from "react-native";
import React from "react";
import CustomHeader from "@/components/customheader";

const profile = () => {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <CustomHeader title="Profile" />

        <View className=" items-center justify-center mt-10">
          <Image
            source={{
              uri: "https://avatars.githubusercontent.com/u/127547778?v=4",
            }}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text
          className="text-tertiary mt-4 px-6"
          style={{ fontFamily: "Poppins_700Bold", fontSize: 30 }}
        >
          Samvabya
        </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default profile;
