import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Userpic from "./userpic";
import { Icon } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";

export default function CreateContent() {
  const { user } = useAuth() as { user: any };
  return (
    <View>
      <View className="ml-10">
        <Text
          style={{ fontFamily: "Poppins_400Regular", fontSize: 18 }}
          className="text-accent"
        >
          Create
        </Text>
      </View>
      <View className="flex-row ml-10 mr-4 mb-4 gap-2 ">
        <TouchableOpacity className="">
          <View className="border-primary border-4 h-[100px] w-[100px] bg-primary rounded-3xl" />
          <View className="absolute top-4 left-4 ">
            <Userpic imageUrl={user.image} />
          </View>
          <View className="absolute bottom-5 right-5">
            <Icon
              source={require("../assets/icons/story.png")}
              size={30}
              color="#463f3a"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="px-6 py-4 bg-primary rounded-3xl  flex-1 items-center justify-center" 
        onPress={() => {router.push("/newPost")}}>
          <View className="flex-row gap-4">
            <Userpic imageUrl={user.image} />
            <Text
              style={{ fontFamily: "Poppins_500Medium", fontSize: 24 }}
              className="text-accent"
            >
              Post
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
