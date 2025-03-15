import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import "../../global.css";
import Userpic from "@/components/userpic";
import HomeHeader from "@/components/homeheader";

const index = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular: require("../../assets/fonts/Poppins-Regular.ttf"),
    Poppins_500Medium: require("../../assets/fonts/Poppins-Medium.ttf"),
    Poppins_700Bold: require("../../assets/fonts/Poppins-Bold.ttf"),
  });
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <HomeHeader />

        <ScrollView className="" horizontal>
          <View className="ml-10" />
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <View className="mr-2">
              <Image
                source={{
                  uri: `https://picsum.photos/200?random=${item}`,
                }}
                style={{ width: 100, height: 100, borderRadius: 20 }}
                className="mt-8 border-primary border-4"
              />
            </View>
          ))}
          <View className="ml-10" />
        </ScrollView>

        <View className="mt-8" />

        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <View className="ml-10 mb-4 bg-primary rounded-l-3xl">
            <View className="ml-2 mt-2 flex-row items-center">
              <Userpic />
              <View className="flex-col ml-2">
                <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
                  Xi Jingping
                </Text>
                <Text
                  className="text-grey-500"
                  style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
                >
                  Chinese Democratic Republic
                </Text>
              </View>
            </View>
            <Image
              source={{
                uri: `https://picsum.photos/300?random=${item}`,
              }}
              style={{ width: 300, height: 300, borderRadius: 20 }}
              className="m-2"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default index;
