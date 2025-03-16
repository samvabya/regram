import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Userpic from "./userpic";
import { getSupabaseUrl } from "@/services/imageService";
import { ResizeMode, Video } from "expo-av";
import { Icon } from "react-native-paper";

export default function PostItem(item: any) {
  // console.log(item);
  return (
    <TouchableOpacity className="ml-10 mb-4 bg-primary rounded-l-3xl">
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
      {item.item.body && <Text className="text-lg px-4 mb-2 font-medium">
        {item.item.body}
      </Text>}
      {item.item.file && item?.item.file.includes('postImages') && <Image
        source={getSupabaseUrl(item.item.file)}
        style={{ width: 300, height: 300, borderRadius: 20 }}
        className="m-2"
      />}
      {item.item.file && item?.item.file.includes('postVideos') && <Video
        source={getSupabaseUrl(item.item.file)}
        style={{ width: 300, height: 300, borderRadius: 20, margin: 8 }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
      />}
      <View className="flex-row items-center justify-end px-4 mb-2 gap-2">
        <Icon source={"heart"} size={14} />
        <Icon source={"comment"} size={14} />
      </View>
    </TouchableOpacity>
  );
}
