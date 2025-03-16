import { View, Text, Image, Alert } from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

const HomeHeader = ({ iconShown = true }) => {
  return (
    <View className="flex-row items-center">
      <View className="flex-1 flex-col">
        <Image
          className="ml-10 mt-6"
          source={require("../assets/images/regram.png")}
          style={{ width: 150, height: 50, objectFit: "contain" }}
        />
        <Text
          className="ml-11 text-gray-500"
          style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
        >
          Minimal Social App
        </Text>
      </View>
      {iconShown && (
        <View className="flex mr-6">
          <IconButton
            icon={require("../assets/icons/setting.png")}
            iconColor="black"
            size={20}
            onPress={() => {
              router.push("/settings");
            }}
          />
        </View>
      )}
    </View>
  );
};

export default HomeHeader;
